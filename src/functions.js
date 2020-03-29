var Xray = require('x-ray')
var xray = Xray()
const download = require('download');
var path = require('path')
const ora = require('ora');
const fs = require('fs')
// import fs from 'fs';

module.exports.download = head;

const spinner = ora({
  text: 'fetching...',
  stream: process.stdout,
  isEnabled: true,
});

async function head(url, option, dir){
  spinner.start();
  let TITLE = await getTitle(url)
  let DOWNLOAD_DIR = await setPath(dir, TITLE)
  links = await extractLink(url)
  downloadImage(links, option, DOWNLOAD_DIR)
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

async function setPath(dest, title){
  try {
    if(dest === '.'){
      return path.join(process.cwd(), title);
    }else if(dest){
      if (fs.existsSync(dest)) {
        return path.join(dest, title)
      }
    throw "cannot find directory. Destination set to Downloads"
    }else{
      return path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads/'+title)
    }
  } catch (error) {
    spinner.fail(error)
    return path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads/'+title)
  }
}

function getTitle(url){
  try {
    return xray(url, 'div.level-item h1', '@title');
  } catch (error) {
    console.log(error)
  }
}

async function downloadImage(links, option, dir){
  if (option){
    parallelDownload(links, dir)
  }else{
   normalDownload(links, dir)
  }
}

function parallelDownload(links, dir){
  // 14.64s | 10.9 MB @  110Mbps
  spinner.start('Downloading')
  for (const i in links){
    download(links[i].image, dir).then(() => spinner.succeed('Image Downloaded'))
  }
}

async function normalDownload(links, dir){
  // 32.90s | 10.9 MB @  110Mbps
  for (const i in links){
    let counter = i;
    counter++;
    spinner.text = 'Downloading '+ counter +'/'+links.length
    spinner.start()
    await download(links[i].image, dir).then(() => {
      spinner.text = 'Downloading '+ counter +'/'+links.length
    })
  }
  spinner.succeed('Album downloaded').stop();
}

