import { JsonReport } from './typings/JsonReport';
import {
    Options,
    shouldInstallDeps,
    shouldRunTestScript,
} from './typings/Options';
import { collectCoverage } from './collectCoverage';
import { DataCollector } from './DataCollector';
import { installDependencies } from './installDependencies';
import { parseCoverage } from './parseCoverage';
import { runStage } from './runStage';
import { runTest } from './runTest';

export const getCoverage = async (
    dataCollector: DataCollector<JsonReport>,
    options: Options,
    runAll: boolean
): Promise<JsonReport> => {
    await runStage('install', dataCollector, async (skip) => {
        if (!runAll && !shouldInstallDeps(options!.skipStep)) {
            skip();
        }

        await installDependencies(
            options?.packageManager,
            options?.workingDirectory
        );
    });

    await runStage('runTest', dataCollector, async (skip) => {
        if (!runAll && !shouldRunTestScript(options!.skipStep)) {
            skip();
        }

        await runTest(options!.testScript, options?.workingDirectory);
    });

    const [isCoverageCollected, rawCoverage] = await runStage(
        'collectCoverage',
        dataCollector,
        async () => {
            return await collectCoverage(options!.workingDirectory);
        }
    );

    const [coverageParsed, jsonReport] = await runStage(
        'parseCoverage',
        dataCollector,
        async (skip) => {
            if (!isCoverageCollected) {
                skip();
            }

            const jsonReport = parseCoverage(rawCoverage!);

            return jsonReport;
        }
    );

    if (!coverageParsed) {
        // TODO: set normal error
        throw 0;
    }

    return jsonReport!;
};
