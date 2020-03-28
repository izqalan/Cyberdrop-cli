var Xray = require('x-ray')
var xray = Xray()
const fs = require('fs');
const download = require('download');
var path = require('path')
const ora = require('ora');

module.exports.download = head;

const spinner = ora({
  text: 'fetching...',
  stream: process.stdout,
  isEnabled: true,
});

async function head(url){
  spinner.start();
  links = await extractLink(url)
  downloadImage(links, url).then(spinner.stop().clear())
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

async function downloadImage(lnks, url){
  const title = await getTitle(url);
  var DOWNLOAD_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'downloads/'+title);
  for (const i in links){
    let counter = i;
    counter++;
    download(links[i].image, DOWNLOAD_DIR).then(() => {
      console.log('Downloading '+ counter +'/'+links.length)
    })
    spinner.stop().clear();
  }
}

function getTitle(url){
  try {
    return xray(url, 'div.level-item h1', '@title');
  } catch (error) {
    console.log(error)
  }
}
