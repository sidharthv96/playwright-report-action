import { exec } from '@actions/exec';

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    console.log(testCommand);
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

    console.log(
        await exec('npx playwright test --help', [], {
            // cwd: workingDirectory,
        })
    );
    console.log(
        await exec(testCommand, [], {
            // cwd: workingDirectory,
        })
    );
};
