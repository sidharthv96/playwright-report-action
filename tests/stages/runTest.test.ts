import { exec } from '@actions/exec';

import { runTest } from '../../src/stages/runTest';

const clearMocks = () => {
    (exec as jest.Mock<any, any>).mockClear();
};

beforeEach(clearMocks);

describe('runTest', () => {
    it('should run test script', async () => {
        await runTest('npm run test');

        expect(exec).toBeCalledWith('npm run test', [], {
            cwd: undefined,
        });
    });

    it('should run test script in custom working directory', async () => {
        await runTest('npm run test', 'custom cwd');

        expect(exec).toBeCalledWith('npm run test', [], {
            cwd: 'custom cwd',
        });
    });
});
