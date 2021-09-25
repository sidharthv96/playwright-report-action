import { collectCoverage } from './collectCoverage';
import { installDependencies } from './installDependencies';
import { parseCoverage } from './parseCoverage';
import { runTest } from './runTest';
import { JSONReport } from '../typings/JsonReport';
import {
    Options,
    shouldInstallDeps,
    shouldRunTestScript,
} from '../typings/Options';
import { FailReason } from '../typings/Report';
import { DataCollector } from '../utils/DataCollector';
import { runStage } from '../utils/runStage';

export const getCoverage = async (
    dataCollector: DataCollector<JSONReport>,
    options: Options,
    runAll: boolean,
    coverageFilePath: string | undefined
): Promise<JSONReport> => {
    await runStage('install', dataCollector, async (skip) => {
        if (
            coverageFilePath ||
            (!runAll && !shouldInstallDeps(options.skipStep))
        ) {
            skip();
        }

        await installDependencies(
            options.packageManager,
            options.workingDirectory
        );
    });

    await runStage('runTest', dataCollector, async (skip) => {
        if (
            coverageFilePath ||
            (!runAll && !shouldRunTestScript(options.skipStep))
        ) {
            skip();
        }

        await runTest(options.testScript, options.workingDirectory);
    });

    const [isCoverageCollected, rawCoverage] = await runStage(
        'collectCoverage',
        dataCollector,
        async () => {
            return await collectCoverage(
                dataCollector as DataCollector<unknown>,
                options.workingDirectory,
                coverageFilePath
            );
        }
    );

    const [coverageParsed, JSONReport] = await runStage(
        'parseCoverage',
        dataCollector,
        async (skip) => {
            if (!isCoverageCollected) {
                skip();
            }

            const JSONReport = parseCoverage(rawCoverage!);

            return JSONReport;
        }
    );

    if (!coverageParsed || !JSONReport) {
        throw FailReason.FAILED_GETTING_COVERAGE;
    }

    return JSONReport;
};
