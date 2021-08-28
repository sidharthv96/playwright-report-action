import { TestRunReport } from '../typings/TestRunReport';

export const formatRunReport = (report: TestRunReport): string => {
    let body = `# ${report.title}\n`;
    if (report.failures) {
        body += `
<details>
<summary>${report.summary}</summary>
${report.failures}
</details>`;
    } else {
        body += `## ${report.summary}`;
    }
    return body;
};
