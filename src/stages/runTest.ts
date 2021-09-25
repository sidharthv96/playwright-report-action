import { exec } from '@actions/exec';

import { REPORT_PATH } from '../constants/REPORT_PATH';

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    await exec('npm install', [], {
        // cwd: workingDirectory,
    });

    console.log(testCommand);

    await exec(testCommand, [], {
        env: {
            ...process.env,
            PLAYWRIGHT_JSON_OUTPUT_NAME: REPORT_PATH,
        },
    });
};
