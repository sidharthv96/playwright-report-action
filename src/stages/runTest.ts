import { exec } from '@actions/exec';

import { joinPaths } from '../utils/joinPaths';

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    console.log('pwd');
    await exec('pwd', undefined, {
        cwd: workingDirectory,
    });

    await exec('pwd', undefined, {
        // cwd: workingDirectory,
    });

    await exec('npx --help', undefined, {
        cwd: workingDirectory,
    });

    await exec('npm install', [], {
        // cwd: workingDirectory,
    });

    console.log(testCommand);

    await exec('npm run test:ci');
};
