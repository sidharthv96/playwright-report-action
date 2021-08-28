import stripAnsi from 'strip-ansi';

import { JsonReport } from '../typings/JsonReport';

export const getFailureDetails = (report: JsonReport): String =>
    report.testResults && report.testResults.length > 0
        ? '\n```bash\n' +
          report.testResults
              ?.map(({ message }) => stripAnsi(message))
              .join('```\n```bash') +
          '```'
        : '';
