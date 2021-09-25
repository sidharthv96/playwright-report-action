import stripAnsi from 'strip-ansi';

import { JSONReport } from '../typings/JsonReport';

export const getFailureDetails = ({
    summary: { testResults },
}: JSONReport): string => {
    if (
        !testResults ||
        !testResults.some(
            ({ failureMessages, ok }) => failureMessages.length > 0 && !ok
        )
    ) {
        return '';
    }
    const wrapCode = (code: string) => '```\n' + code + '\n```';
    const codeBlocks = testResults
        .filter(({ ok }) => !ok)
        .map(({ failureMessages }) => {
            const messages = [];
            for (const failures of failureMessages) {
                for (const [i, failure] of failures.entries()) {
                    messages.push(`Run ${i + 1}\n`, failure, '\n');
                }
            }
            const stripped = stripAnsi(messages.join('\n'));
            if (stripped.trim().length === 0) {
                return '';
            }
            return wrapCode(stripped);
        })
        .filter(({ length }) => length > 0);
    return codeBlocks.join('\n---\n');
};
