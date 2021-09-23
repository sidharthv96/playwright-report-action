import { exec } from '@actions/exec';

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    console.log(testCommand);
    console.log(
        await exec(testCommand, [], {
            // cwd: workingDirectory,
        })
    );
};
