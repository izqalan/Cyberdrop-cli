var Xray = require('x-ray')
var xray = Xray()
const download = require('download');
var path = require('path')
const ora = require('ora');

module.exports.download = head;

const spinner = ora({
  text: 'fetching...',
  stream: process.stdout,
  isEnabled: true,
});

async function head(url, option){
  spinner.start();
  links = await extractLink(url)
  downloadImage(links, url, option).then(spinner.stop().clear())
}

// extracts all pics from album
function extractLink(url) {
  try {
    return xray(url, 'a.image', [{
      image: '@href'
    }])
  } catch (error) {
    console.log(error)
  }
}

function parallelDownload(links, dir){
  // 14.64 s
  for (const i in links){
    download(links[i].image, dir).then(() => spinner.succeed('Download Finished!'))
  }
  spinner.start('Downloading')
}

async function normalDownload(links, dir){
  // 32.90 s
  for (const i in links){
    let counter = i;
    counter++;
    spinner.text = 'Downloading '+ counter +'/'+links.length
    spinner.start()
    // remove await for parallel download (faster)
    await download(links[i].image, dir).then(() => {
      spinner.text = 'Downloading '+ counter +'/'+links.length
    })
  }
  spinner.succeed('Download Finished!').stop();
}

async function downloadImage(links, url, option){
  const title = await getTitle(url);
  var DOWNLOAD_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'downloads/'+title);
  if (option){
    parallelDownload(links, DOWNLOAD_DIR)
  }else{
   normalDownload(links, DOWNLOAD_DIR)
  }
}

function getTitle(url){
  try {
    return xray(url, 'div.level-item h1', '@title');
  } catch (error) {
    console.log(error)
  }
}
