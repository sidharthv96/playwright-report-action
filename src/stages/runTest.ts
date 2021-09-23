import { exec } from '@actions/exec';

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    console.log(testCommand);
    await exec(testCommand, [], {
        // cwd: workingDirectory,
    });
};
