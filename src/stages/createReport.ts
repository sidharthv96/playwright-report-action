import { context } from '@actions/github';

import { getReportTag } from '../constants/getReportTag';
import { formatErrors } from '../format/formatErrors';
import { formatRunReport } from '../format/formatRunReport';
import { getFailureDetails } from '../format/getFailureDetails';
import { getTestRunSummary } from '../format/summary/getTestRunSummary';
import template from '../format/template.md';
import { JSONReport } from '../typings/JsonReport';
import { SummaryReport, TestRunReport } from '../typings/Report';
import { DataCollector } from '../utils/DataCollector';
import { i18n } from '../utils/i18n';
import { insertArgs } from '../utils/insertArgs';

export const getSha = () =>
    context.payload.after ??
    context.payload.pull_request?.head.sha ??
    context.sha;

export const createReport = (
    dataCollector: DataCollector<JSONReport>,
    workingDirectory?: string,
    customTitle?: string
): SummaryReport => {
    const { errors, data } = dataCollector.get();
    const [headReport] = data;
    const formattedErrors = formatErrors(errors);

    const runReport: TestRunReport = {
        title: i18n(headReport.summary.success ? 'testsSuccess' : 'testsFail'),
        summary: getTestRunSummary(headReport),
        failures: getFailureDetails(headReport),
    };
    const formattedReport = formatRunReport(runReport);
    return {
        text: insertArgs(template, {
            body: [formattedErrors, formattedReport].join('\n'),
            dir: workingDirectory || '',
            tag: getReportTag(workingDirectory),
            title: insertArgs(customTitle || i18n('summaryTitle'), {
                dir: workingDirectory ? `for \`${workingDirectory}\`` : '',
            }),
            sha: getSha(),
        }),
        runReport,
    };
};
