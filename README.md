# ng-helper-cli

## Cli which adds dependencies and configures prettier and eslint for new angular projects. Also create basic directories and add configurated scripts for [indexify-dir-cli](https://www.npmjs.com/package/indexify-dir-cli)

Arguments:<br />
path (Optional) Path angular project root (default: null)<br />

Options:<br />
-v --version Output the version number<br />
--np --no-prettier Cli will not add pretier to the project<br />
--ne --no-eslint Cli will not add eslint to the project<br />
--ns --no-structure Cli will not add core directories structure<br />
--sd --structure-dirs <string...> Additional directories to add in core directory (default: [])<br />
--ni --no-indexify Cli will not add indexify dependency and scripts<br />
--legacy-peer-deps All npm installation will be done with --legacy-peer-deps flag (default: false)<br />
-V --verbose Make cli more talkative :) (default: false)<br />
-h, --help display help for command<br />
