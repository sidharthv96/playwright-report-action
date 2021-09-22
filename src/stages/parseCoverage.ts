import { JSONReport, Suite, Summary } from '../typings/JsonReport';
import { FailReason } from '../typings/Report';

const combineStats = (stat1: Summary, stat2: Summary): Summary => {
    const stats: Summary = {
        numFailedTestSuites:
            stat1.numFailedTestSuites + stat2.numFailedTestSuites,
        numFailedTests: stat1.numFailedTests + stat2.numFailedTests,
        numPassedTestSuites:
            stat1.numPassedTestSuites + stat2.numPassedTestSuites,
        numPassedTests: stat1.numPassedTests + stat2.numPassedTests,
        numTotalTestSuites: stat1.numTotalTestSuites + stat2.numTotalTestSuites,
        numTotalTests: stat1.numTotalTests + stat2.numTotalTests,
        success: stat1.success && stat2.success,
        testResults: [...stat1.testResults, ...stat2.testResults],
    };

    return stats;
};

const generateStats = (suites: Suite[] = [], parent?: string): Summary => {
    let stats: Summary = {
        numFailedTestSuites: 0,
        numFailedTests: 0,
        numPassedTestSuites: 0,
        numPassedTests: 0,
        numTotalTestSuites: 0,
        numTotalTests: 0,
        success: true,
        testResults: [],
    };

    stats.numTotalTestSuites = suites.length;

    for (const suite of suites) {
        if (suite.suites) {
            const childStats: Summary = generateStats(
                suite.suites,
                suite.title
            );
            stats = combineStats(stats, childStats);
            if (childStats.success) {
                stats.numPassedTestSuites += 1;
            }
        }

        if (suite.specs && suite.specs.length > 0) {
            suite.specs.forEach((spec) => {
                if (!spec.parents) {
                    spec.parents = [];
                }
                spec.parents.unshift(suite.title);
                console.log(spec.tests);
                spec.failureMessages = spec.tests.map(({ results }) =>
                    results.map(({ error }) => error?.message ?? '')
                );
            });
            const numTotalTests = suite.specs.length;
            const numPassedTests = suite.specs.filter(({ ok }) => ok).length;
            const numFailedTests = numTotalTests - numPassedTests;

            stats.numTotalTests += numTotalTests;
            stats.numPassedTests += numPassedTests;
            stats.numFailedTests += numFailedTests;
            stats.testResults = [...stats.testResults, ...suite.specs];
        }
    }

    if (parent) {
        stats.testResults.forEach((testResult) =>
            testResult.parents.unshift(parent)
        );
    }
    stats.numFailedTestSuites =
        stats.numTotalTestSuites - stats.numPassedTestSuites;
    stats.success = stats.numFailedTests === 0;

    return stats;
};

export const parseCoverage = (src: string): JSONReport => {
    try {
        const report: JSONReport = JSON.parse(src);
        report.summary = generateStats(report.suites);
        const specsByFile = report.summary.testResults.reduce((r, result) => {
            r[result.file] = r[result.file] || [];
            r[result.file].push(result);
            return r;
        }, Object.create(null));
        report.testResultsPerFile = Object.values(specsByFile);
        console.log(report.testResultsPerFile);
        return report;
    } catch (err) {
        throw FailReason.INVALID_COVERAGE_FORMAT;
    }
};
