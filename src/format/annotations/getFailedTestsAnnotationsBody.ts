import stripAnsi from 'strip-ansi';

import { JsonReport } from '../../typings/JsonReport';
import { i18n } from '../../utils/i18n';
import { getFailureDetails } from '../getFormattedFailures';

export const getFailedTestsAnnotationsBody = (jsonReport: JsonReport) =>
    i18n('testsFailSummaryPt2') + getFailureDetails(jsonReport);
