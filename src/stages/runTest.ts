import { exec } from '@actions/exec';

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    console.log(testCommand);
    console.log(
        await exec('cwd', [], {
            // cwd: workingDirectory,
        })
    );
    console.log(
        await exec('npx --help', [], {
            // cwd: workingDirectory,
        })
    );
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
