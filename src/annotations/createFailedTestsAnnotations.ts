import { relative } from 'path';

import stripAnsi from 'strip-ansi';

import { Annotation } from './Annotation';
import { JSONReport } from '../typings/JsonReport';

export const createFailedTestsAnnotations = (
    jsonReport: JSONReport
): Array<Annotation> => {
    const testResults = jsonReport.testResultsPerFile;

    if (!testResults) {
        return [];
    }

    const annotations: Array<Annotation> = [];

    const cwd = process.cwd();

    testResults.forEach((assertionResults) => {
        if (!assertionResults) {
            return;
        }

        annotations.push(
            ...assertionResults
                .filter(({ ok }) => !ok)
                .map<Annotation>(
                    ({ line, parents, title, file, failureMessages }) => ({
                        annotation_level: 'failure',
                        path: relative(cwd, file),
                        start_line: line ?? 0,
                        end_line: line ?? 0,
                        title: parents?.concat(title).join(' > '),
                        message: stripAnsi(
                            failureMessages?.flat(1).join('\n\n') ?? ''
                        ),
                    })
                )
        );
    });

    return annotations;
};
