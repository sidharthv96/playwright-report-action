import { CoverageDetailsMap, CoverageSummary } from './Coverage';
import { TestRunReport } from './TestRunReport';

export enum FailReason {
    TESTS_FAILED = 'testsFailed',
    INVALID_COVERAGE_FORMAT = 'invalidFormat',
    UNDER_THRESHOLD = 'underThreshold',
    UNKNOWN_ERROR = 'unknownError',
}

export type Report = {
    success: boolean;
    summary?: Array<CoverageSummary>;
    details?: CoverageDetailsMap;
    failReason?: FailReason;
    error?: Error;
};

export type SummaryReport = {
    report: string;
    runReport: TestRunReport;
};
