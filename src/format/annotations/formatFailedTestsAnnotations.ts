import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
import { getFailedAnnotationsSummary } from './getFailedAnnotationsSummary';
import { getFailedTestsAnnotationsBody } from './getFailedTestsAnnotationsBody';
import { Annotation } from '../../annotations/Annotation';
import { FailureReport } from '../../typings/FailureReport';
import { JsonReport } from '../../typings/JsonReport';
import { insertArgs } from '../../utils/insertArgs';
import {
    failedTestsCheckName,
    testsFail,
    testsSuccess,
    tooMuchAnnotations,
} from '../strings.json';

export const formatFailedTestsAnnotations = (
    failureReport: FailureReport,
    annotations: Array<Annotation>
): CreateCheckOptions => ({
    ...context.repo,
    status: 'completed',
    head_sha: context.payload.pull_request?.head.sha ?? context.sha,
    conclusion: 'failure',
    name: failedTestsCheckName,
    output: {
        // Will failureTestAnnotation be generated if jsonReport.success is true?
        title: testsFail,
        text: [
            getFailedTestsAnnotationsBody(failureReport),
            annotations.length > 50 &&
                insertArgs(tooMuchAnnotations, {
                    hiddenCount: annotations.length - 50,
                }),
        ]
            .filter(Boolean)
            .join('\n'),
        summary: failureReport.summary,
        annotations: annotations.slice(0, 49),
    },
});
