import { readFileSync } from 'fs';

import { getFailureDetails } from './format/getFailureDetails';
import { parseCoverage } from './stages/parseCoverage';

const result = parseCoverage(
    readFileSync('tests/mock-data/jsonReport.json').toString()
);
console.log(
    JSON.stringify(
        result.summary.testResults.map(({ parents, file, title }) => {
            return { parents, file, title };
        }),
        null,
        2
    )
);

console.log(getFailureDetails(result));
