#!/usr/bin/env node

require = require('esm')(module /*, options */);

const { program } = require('commander');
const { download } = require('../src/functions')
var pjson = require('../package.json');

program
  .version(pjson.version)
  .description(pjson.description)

program
  .command('download [album link]')
  .alias('d')
  .description('Download pictures from specified album')
  .action(album => download(album))

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);