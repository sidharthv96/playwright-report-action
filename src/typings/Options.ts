import { getInput } from '@actions/core';
import * as yup from 'yup';

import { icons } from '../format/strings.json';

export type IconType = keyof typeof icons;

export type AnnotationType = 'all' | 'none' | 'failed-tests';
export type PackageManagerType = 'npm' | 'yarn';
export type SkipStepType = 'all' | 'none' | 'install';

export type Options = {
    token: string;
    testScript: string;
    iconType: IconType;
    annotations: AnnotationType;
    workingDirectory?: string;
    packageManager: PackageManagerType;
    skipStep: SkipStepType;
    customTitle?: string;
    coverageFile?: string;
};

const validAnnotationOptions: Array<AnnotationType> = [
    'all',
    'none',
    'failed-tests',
];

const packageManagerOptions: Array<PackageManagerType> = ['npm', 'yarn'];

const validIconOptions = Object.keys(icons);

const validSkipStepOptions: Array<SkipStepType> = ['all', 'none', 'install'];

const optionSchema = yup.object().shape({
    token: yup.string().required(),
    testScript: yup.string().required(),
    iconType: yup.string().required().oneOf(validIconOptions),
    annotations: yup.string().required().oneOf(validAnnotationOptions),
    workingDirectory: yup.string(),
    packageManager: yup.string().required().oneOf(packageManagerOptions),
    skipStep: yup.string().required().oneOf(validSkipStepOptions),
    customTitle: yup.string(),
    coverageFile: yup.string(),
});

export const shouldInstallDeps = (skipStep: SkipStepType): Boolean =>
    !['all', 'install'].includes(skipStep);

export const shouldRunTestScript = (skipStep: SkipStepType): Boolean =>
    !['all'].includes(skipStep);

export const getOptions = async (): Promise<Options> => {
    const token = getInput('github-token', {
        required: true,
    });

    const testScript = getInput('test-script');
    const workingDirectory = getInput('working-directory');
    const iconType = getInput('icons');
    const annotations = getInput('annotations');
    const packageManager = getInput('package-manager');
    const skipStep = getInput('skip-step');
    const customTitle = getInput('custom-title');
    const coverageFile = getInput('coverage-file');

    try {
        const options: Options = (await optionSchema.validate({
            token,
            testScript,
            workingDirectory,
            iconType,
            annotations,
            packageManager,
            skipStep,
            customTitle,
            coverageFile,
        })) as Options;

        return options;
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            throw new Error(
                [err.message, ...err.errors].filter(Boolean).join('\n')
            );
        }

        throw err;
    }
};
