import { context } from '@actions/github';

import { getReportTag } from '../constants/getReportTag';
import { getFailedTestsAnnotationsBody } from '../format/annotations/getFailedTestsAnnotationsBody';
import { formatCoverage } from '../format/formatCoverage';
import { formatErrors } from '../format/formatErrors';
import template from '../format/template.md';
import { JsonReport } from '../typings/JsonReport';
import { DataCollector } from '../utils/DataCollector';
import { i18n } from '../utils/i18n';
import { insertArgs } from '../utils/insertArgs';

export const createReport = (
    dataCollector: DataCollector<JsonReport>,
    workingDirectory?: string,
    customTitle?: string
): string => {
    const { errors, data } = dataCollector.get();
    const [headReport, baseReport] = data;
    const formattedErrors = formatErrors(errors);

    const coverage = formatCoverage(headReport, baseReport, undefined);
    const failures = getFailedTestsAnnotationsBody(headReport, false);

    return insertArgs(template, {
        body: [formattedErrors, coverage, failures].join('\n'),
        dir: workingDirectory || '',
        tag: getReportTag(workingDirectory),
        title: insertArgs(customTitle || i18n('summaryTitle'), {
            dir: workingDirectory ? `for \`${workingDirectory}\`` : '',
        }),
        sha:
            context.payload.after ??
            context.payload.pull_request?.head.sha ??
            context.sha,
    });
};
