export interface Summary {
    testResults: Spec[];
    numFailedTestSuites: number;
    numFailedTests: number;
    numPassedTestSuites: number;
    numPassedTests: number;
    numTotalTestSuites: number;
    numTotalTests: number;
    success: boolean;
}

export interface JSONReport {
    suites: Suite[];
    errors: Error[];
    summary: Summary;
    testResultsPerFile: Spec[][];
}

export interface Suite {
    title: string;
    file: string;
    column: number;
    line: number;
    specs: Spec[];
    suites?: Suite[];
}
export interface Spec {
    tags: string[];
    title: string;
    ok: boolean;
    parents: string[];
    tests: Test[];
    file: string;
    line: number;
    column: number;
    failureMessages: string[][];
}
export interface Test {
    timeout: number;
    annotations: { type: string; description?: string }[];
    expectedStatus: TestStatus;
    projectName: string;
    results: TestResult[];
    status: 'skipped' | 'expected' | 'unexpected' | 'flaky';
}
export interface TestResult {
    workerIndex: number;
    status: TestStatus | undefined;
    duration: number;
    error: TestError | undefined;
    stdout: STDIOEntry[];
    stderr: STDIOEntry[];
    retry: number;
    steps?: TestStep[];
    attachments: {
        name: string;
        path?: string;
        body?: string;
        contentType: string;
    }[];
}
export interface TestStep {
    title: string;
    duration: number;
    error: TestError | undefined;
    steps?: TestStep[];
}

export type STDIOEntry = { text: string } | { buffer: string };

export type TestStatus = 'passed' | 'failed' | 'timedOut' | 'skipped';
export interface TestError {
    message?: string;
    stack?: string;
    value?: string;
}

export interface Location {
    line: number;
    column?: number;
}
