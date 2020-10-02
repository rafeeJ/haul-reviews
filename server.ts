import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as isbot from 'isbot';
const axios = require('axios');
const cheerio = require('cheerio');
const iconv =  require('iconv-lite');

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/haul-reviewer/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  isbot.extend(['Mozilla/5.0 (compatible; vkShare; +http://vk.com/dev/Share)', 'PostmanRuntime/7.25.0']);

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

/** 
 * Returns the specified product's title, available sizes and available colours. 
 * It will not return sizes/colours array if they are not applicable
 * 
 * @param {number} id The TaoBao ID for the specified product.
 * @return {object} Object with title, colours and sizes 
 */
server.get('/api/url/taobao/:id', function (req, res) {
  // Create the URL from the id
  let url = `https://item.taobao.com/item.htm?id=${req.params.id}`
  var result = {}
  result["ID"] = Number(req.params.id)
  result["origin"] = "TaoBao"
  // Call axios and then decode with iconv
  axios.get(url, { responseType: 'arraybuffer' })
    .then((response) => {
      let data = iconv.decode(response.data, 'gbk')

      // Instantiate cheerio
      let $ = cheerio.load(data);

      // Get the title
      let title = $('h3', '#J_Title').text().trim()
      result["title"] = title
    
      // Check if the colour list element exists, and if it does, push to the colours array.
      //let coloursHTML = $('.J_Prop_Color')
      let coloursHTML = $('li > a > span', '.J_Prop_Color')
      if(coloursHTML) {
        let colours = []
        coloursHTML.each(function(i, ele) {
          colours.push($(this).text())
        })
        if(colours.length != 0) {
          result["colours"] = colours
        }
      }

      // Check if the sizes list element exists, and if it does, push to the sizes array.
      let sizesHTML = $('li > a > span', '.J_Prop_measurement')
      if(sizesHTML) {
        let sizes = []
        sizesHTML.each(function(i, ele) {
          sizes.push($(this).text())
        })
        if(sizes.length != 0) {
          result["sizes"] = sizes
        }
      }
      if(title === "") {
        res.send("rip")
      } else {
        res.send(result)
      }
    })
});

/** 
 * Returns the specified product's title, available sizes and available colours. 
 * It will not return sizes/colours array if they are not applicable
 * 
 * @param {number} id The Weidian ID for the specified product.
 * @return {object} Object with title, colours and sizes 
 */
server.get('/api/url/weidian/:id', function (req, res) {
  // Create the URL from the id
  let url = `https://weidian.com/item.html?itemID=${req.params.id}`
  var result = {}
  result["ID"] = Number(req.params.id)
  result["origin"] = "Weidian"
  // Call axios and then decode with iconv
  axios.get(url, { responseType: 'arraybuffer' })
    .then((response) => {
      let data = iconv.decode(response.data, 'gbk')

      // Instantiate cheerio
      let $ = cheerio.load(data);

      // Get the title
      let title = $('.item-name', '.content-str').text()//.trim()
      console.log(title);
      result["title"] = title
      
      res.send(result)
    })
});

server.get('/api/url/taobao/:id/images', function (req, res) {
  let url = `https://item.taobao.com/item.htm?id=${req.params.id}`
  var result = []

  axios.get(url, { responseType: 'arraybuffer'})
    .then((response) => {
      let data = iconv.decode(response.data, 'gbk')

      // Instantiate cheerio
      let $ = cheerio.load(data);

      let galleryHTML = $('li > div > a > img', '.tb-gallery')
      galleryHTML.each(function(i, ele) {
        result.push($(this).attr('data-src').replace("_50x50.jpg", ""));
      })
      res.send(result)
    })
})

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    const hostUrl = req.protocol + '://' + req.get('Host');
    if(isbot(req.header('User-Agent'))) {
      res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    } else {
      res.sendFile('index.html', { root: 'dist/haul-reviewer/browser' });
    }

  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
