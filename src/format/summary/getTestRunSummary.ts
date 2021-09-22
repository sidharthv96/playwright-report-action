import { JSONReport } from '../../typings/JsonReport';
import { i18n } from '../../utils/i18n';

export const getTestRunSummary = ({ summary }: JSONReport) =>
    summary.success
        ? i18n('testsSuccessSummary', {
              numPassedTests: summary.numPassedTests,
              numPassedTestSuites: summary.numPassedTestSuites,
              ending: summary.numPassedTestSuites > 1 ? 's' : '',
          })
        : i18n('testsFailSummary', {
              numFailedTests: summary.numFailedTests,
              numTotalTests: summary.numTotalTests,
              numFailedTestSuites: summary.numFailedTestSuites,
              numTotalTestSuites: summary.numTotalTestSuites,
          });
