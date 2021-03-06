# Playwright report action 🎭

<p align="center">
  <img alt="PR Comment example" width="540" src="./img/Github-comment-screenshot.png">
</p>

<p align="center">
    A GitHub action that reports playwright test results in every pull request.
</p>

<p align="center">
    <a href="https://github.com/sidharthv96/playwright-report-action"><img alt="MIT License" src="https://img.shields.io/github/license/sidharthv96/playwright-report-action"></img></a>
    <a href="https://github.com/sidharthv96/playwright-report-action/issues"><img alt="Issues" src="https://img.shields.io/github/issues/sidharthv96/playwright-report-action"></img></a>
</p>

This action uses [Playwright](https://github.com/microsoft/playwright) to run e2e tests, and comments it's results on pull request. Forked from [jest-coverage-report-action](https://github.com/ArtiomTr/jest-coverage-report-action).

## Status

This action is being developed and is in Beta state. There will be bugs and inconsistencies. Please raise Issues.

## Usage

1. Install and configure [Playwright](https://github.com/microsoft/playwright).
2. Create new action inside `.github/workflows`:

**Minimal configuration**

```yml
name: 'playwright'
on:
    pull_request:
        branches:
            - master
            - main
jobs:
    playwright:
        runs-on: ubuntu-latest
        if: "!contains(github.event.head_commit.message, '[skip ci]')"
        steps:
            - uses: actions/checkout@v1
            - uses: sidharthv96/playwright-report-action
              with:
                  github-token: ${{ secrets.GITHUB_TOKEN }}
```

3. Pay attention to the action parameters. You can specify custom [threshold](#specify-threshold) or [test script](#customizing-test-script)
4. That's it!

## Custom working directory

If you want to run this action in custom directory, specify `working-directory`:

```yml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    working-directory: <dir>
```

## Customizing test script

By default, this action will run this command:

```bash
PLAYWRIGHT_JSON_OUTPUT_NAME="report.json" npx playwright test --reporter=json,line
```

If you're not satisfied with default behaviour, you can specify your own command, by passing custom option `test-script`.

> **⚠ IMPORTANT ⚠:** Please, note that this is not simple `npx playwright test` script call. If you're specify your custom script, **YOU SHOULD PASS SAME COVERAGE REPORTERS** as it does default script (`json` reporter). Without those options, your action will not work.

For instance, if you want to run `test:e2e` npm script:

```yml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    test-script: npm run test:e2e
```

## Usage with `yarn`

By default, this action will install your dependencies using `npm`. If you are using `yarn`, you can specify it in the `package-manager` option:

```yml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    package-manager: yarn
```

## Use existing test report(s)

To bypass running unit tests, you can pass the filepath to the current report.json

```yml
with:
    coverage-file: ./tests/report.json
```

-   `coverage-file` is the filepath to the JSON coverage report for the current pull request.

For example, you can save every test run to an artifact and then download and reference them here.

## Skipping steps

By default, this action will install dependencies and run the tests for you, generating the coverage report. Alternatively, you can skip these steps using the `skip-step` option.

```yml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    skip-step: all
```

Accepted values are:

-   `none` (default) - all steps will be run
-   `install` - skip installing dependencies
-   `all` - skip installing dependencies _and_ running the test script

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

Playwright Report action is made with <3 thanks to these wonderful people
([emoji key ✨](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ArtiomTr"><img src="https://avatars.githubusercontent.com/u/44021713?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Artiom Tretjakovas</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=ArtiomTr" title="Code">💻</a> <a href="https://github.com/sidharthv96/playwright-report-action/commits?author=ArtiomTr" title="Documentation">📖</a> <a href="https://github.com/sidharthv96/playwright-report-action/pulls?q=is%3Apr+reviewed-by%3AArtiomTr" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-ArtiomTr" title="Maintenance">🚧</a> <a href="#content-ArtiomTr" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/taschetto"><img src="https://avatars.githubusercontent.com/u/5279182?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Guilherme Taschetto</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=taschetto" title="Code">💻</a> <a href="https://github.com/sidharthv96/playwright-report-action/commits?author=taschetto" title="Documentation">📖</a></td>
    <td align="center"><a href="http://adamtuttle.codes"><img src="https://avatars.githubusercontent.com/u/46990?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Tuttle</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=atuttle" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dadayama"><img src="https://avatars.githubusercontent.com/u/6773164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dadayama</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=dadayama" title="Code">💻</a></td>
    <td align="center"><a href="http://bluelovers.net"><img src="https://avatars.githubusercontent.com/u/167966?v=4?s=100" width="100px;" alt=""/><br /><sub><b>bluelovers</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=bluelovers" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/gdelahodde-masteos"><img src="https://avatars.githubusercontent.com/u/83218823?v=4?s=100" width="100px;" alt=""/><br /><sub><b>gdelahodde-masteos</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=gdelahodde-masteos" title="Code">💻</a> <a href="https://github.com/sidharthv96/playwright-report-action/commits?author=gdelahodde-masteos" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jlim9333"><img src="https://avatars.githubusercontent.com/u/85653304?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jlim9333</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=jlim9333" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://blog.mozmonkey.com"><img src="https://avatars.githubusercontent.com/u/35894?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeremy Gillick</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=jgillick" title="Code">💻</a> <a href="https://github.com/sidharthv96/playwright-report-action/commits?author=jgillick" title="Documentation">📖</a></td>
    <td align="center"><a href="http://zajo.io"><img src="https://avatars.githubusercontent.com/u/1835434?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matej Zajo Kralik</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=Zajozor" title="Code">💻</a></td>
    <td align="center"><a href="http://sidharth.dev"><img src="https://avatars.githubusercontent.com/u/10703445?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sidharth Vinod</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=sidharthv96" title="Code">💻</a></td>
    <td align="center"><a href="https://jaylenwimbish.com"><img src="https://avatars.githubusercontent.com/u/6505395?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jaylen Wimbish</b></sub></a><br /><a href="https://github.com/sidharthv96/playwright-report-action/commits?author=jaylenw" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © [Artiom Tretjakovas](https://github.com/ArtiomTr)
