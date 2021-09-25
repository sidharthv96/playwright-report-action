import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

import { createFailedTestsAnnotations } from './annotations/createFailedTestsAnnotations';
import { formatFailedTestsAnnotations } from './format/annotations/formatFailedTestsAnnotations';
import { generateCommitReport } from './report/generateCommitReport';
import { generatePRReport } from './report/generatePRReport';
import { createReport } from './stages/createReport';
import { getCoverage } from './stages/getCoverage';
import { JSONReport } from './typings/JsonReport';
import { getOptions } from './typings/Options';
import { createDataCollector } from './utils/DataCollector';
import { i18n } from './utils/i18n';
import { runStage } from './utils/runStage';

export const run = async (
    dataCollector = createDataCollector<JSONReport>()
) => {
    const isInPR = context.eventName === 'pull_request';

    const [isInitialized, options] = await runStage(
        'initialize',
        dataCollector,
        getOptions
    );

    if (!isInitialized || !options) {
        throw Error('Initialization failed.');
    }

    const [isHeadCoverageGenerated, headCoverage] = await runStage(
        'headCoverage',
        dataCollector,
        async () => {
            return await getCoverage(
                dataCollector,
                options,
                false,
                options.coverageFile
            );
        }
    );

    if (headCoverage) {
        dataCollector.add(headCoverage);
    }

    const [isReportContentGenerated, summaryReport] = await runStage(
        'generateReportContent',
        dataCollector,
        async () => {
            return createReport(dataCollector, options.workingDirectory);
        }
    );

    await runStage('publishReport', dataCollector, async (skip) => {
        if (!isReportContentGenerated) {
            skip();
        }

        const octokit = getOctokit(options.token);

        if (isInPR) {
            await generatePRReport(
                summaryReport!.text,
                options.workingDirectory,
                context.repo,
                context.payload.pull_request!,
                octokit
            );
        } else {
            await generateCommitReport(
                summaryReport!.text,
                context.repo,
                octokit
            );
        }
    });

    await runStage('failedTestsAnnotations', dataCollector, async (skip) => {
        if (
            !isHeadCoverageGenerated ||
            !['all', 'failed-tests'].includes(options.annotations)
        ) {
            skip();
        }

        const failedAnnotations = createFailedTestsAnnotations(
            headCoverage!,
            options
        );

        if (failedAnnotations.length === 0) {
            skip();
        }

        failedAnnotations.map(
            ({ path, start_line, end_line, title, message }) => {
                console.log(
                    `::error file=${path},line=${start_line},endLine=${end_line},title=${title}::${message}`
                );
            }
        );

        // const octokit = getOctokit(options.token);
        // await octokit.checks.create(
        //     formatFailedTestsAnnotations(
        //         summaryReport!.runReport,
        //         failedAnnotations
        //     )
        // );
    });

    if (dataCollector.get().errors.length > 0) {
        console.log(JSON.stringify(dataCollector.get().errors));
        setFailed(i18n('failed'));
    }
};
