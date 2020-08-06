/**
 * @author Rafee Jenkins <RafeeJenkins@gmail.com>
 */

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv =  require('iconv-lite');

var cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static('./dist/haul-reviewer'));


/** 
 * Returns the specified product's title, available sizes and available colours. 
 * It will not return sizes/colours array if they are not applicable
 * 
 * @param {number} id The TaoBao ID for the specified product.
 * @return {object} Object with title, colours and sizes 
 */
app.get('/api/url/taobao/:id', function (req, res) {
  // Create the URL from the id
  let url = `https://item.taobao.com/item.htm?id=${req.params.id}`
  var result = {}
  
  // Call axios and then decode with iconv
  axios.get(url, { responseType: 'arraybuffer' })
    .then((response) => {
      data = iconv.decode(response.data, 'gbk')

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
        if(!colours.length == 0) {
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
        if(!sizes.length == 0) {
          result["sizes"] = sizes
        }
      }
      
      res.send(result)
    })
});

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/haul-reviewer' }
  );
});

app.listen(process.env.PORT || 8080);