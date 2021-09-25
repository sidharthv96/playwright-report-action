import { join, relative } from 'path';

import stripAnsi from 'strip-ansi';

import { Annotation } from './Annotation';
import { JSONReport } from '../typings/JsonReport';
import { Options } from '../typings/Options';

export const createFailedTestsAnnotations = (
    jsonReport: JSONReport,
    { workingDirectory }: Options
): Array<Annotation> => {
    const testResults = jsonReport.testResultsPerFile;

    if (!testResults) {
        return [];
    }

    const annotations: Array<Annotation> = [];

    const cwd = process.cwd();
    console.log(cwd);

    testResults.forEach((assertionResults) => {
        if (!assertionResults) {
            return;
        }

        annotations.push(
            ...assertionResults
                .filter(({ ok }) => !ok)
                .map<Annotation>(
                    ({ line, parents, title, file, failureMessages }) => {
                        console.log(
                            join(workingDirectory ?? '', relative(cwd, file))
                        );
                        return {
                            annotation_level: 'failure',
                            path: join(
                                workingDirectory ?? '',
                                relative(cwd, file)
                            ),
                            start_line: line ?? 0,
                            end_line: line ?? 0,
                            title: parents?.concat(title).join(' > '),
                            message: stripAnsi(
                                failureMessages?.flat(1).join('\n\n') ?? ''
                            ),
                        };
                    }
                )
        );
    });

    return annotations;
};
