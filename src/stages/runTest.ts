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

    await exec('npx playwright test --help', [], {
        // cwd: workingDirectory,
    });

    console.log(testCommand);

    await exec(testCommand, [], {
        cwd: joinPaths(workingDirectory, '..'),
    });
};
