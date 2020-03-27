// var Xray = require('x-ray')
// var xray = Xray()
// const fs = require('fs');
// const download = require('download');
// var path = require('path')

// test();

// // extracts all pics from album
// function extractLink(url) {
//   try {
//     return xray(url, 'a.image', [{
//       image: '@href'
//     }])
//   } catch (error) {
//     console.log(error)
//   }
// }

// async function downloadImage(lnks, url){
//   const title = await getTitle(url);
//   var DOWNLOAD_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'downloads/'+title);
//   for (const i in links){
//     let counter = i;
//     download(links[i].image, DOWNLOAD_DIR).then(() => {
//       counter++;
//       console.log('Downloading '+ counter +'/'+links.length)
//       console.log('done!')
//     })
//   }
// }

// function getTitle(url){
//   try {
//     return xray(url, 'div.level-item h1', '@title');
//   } catch (error) {
//     console.log(error)
//   }
// }

// async function test(){
//   console.log('fetching...')
//   links = await extractLink("https://cyberdrop.me/a/W3G0UCGh");
//   downloadImage(links, 'https://cyberdrop.me/a/W3G0UCGh')
// } 