export enum FailReason {
    TESTS_FAILED = 'testsFailed',
    INVALID_COVERAGE_FORMAT = 'invalidFormat',
    UNDER_THRESHOLD = 'underThreshold',
    UNKNOWN_ERROR = 'unknownError',
    REPORT_NOT_FOUND = 'reportNotFound',
}

export type TestRunReport = {
    title: string;
    summary: string;
    failures?: string;
};

export type SummaryReport = {
    text: string;
    runReport: TestRunReport;
};
