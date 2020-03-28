#!/usr/bin/env node

require = require('esm')(module /*, options */);

const { program } = require('commander');
const { download } = require('../src/functions')
var pjson = require('../package.json');

program
  .version(pjson.version)
  .description(pjson.description)

program
  .option('-p, --parallel', 'download album images in parallel (faster)')
  .command('download <album>')
  .alias('d')
  .description('Download pictures from specified album')
  .action(album => {
    if(program.parallel){
      download(album, true)
    }else{
      download(album, false)
    }
  })

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);