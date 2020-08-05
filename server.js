const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv =  require('iconv-lite');

var cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static('./dist/haul-reviewer'));

app.get('/api/url/taobao/:id', function (req, res) {
  let url = `https://item.taobao.com/item.htm?id=${req.params.id}`
  
  var result = {}
  
  axios.get(url, { responseType: 'arraybuffer' })
    .then((response) => {
      data = iconv.decode(response.data, 'gbk')
      console.log(data)
      
      let colours = []
      let sizes = []
      let $ = cheerio.load(data);

      let title = $('h3', '#J_Title').text()
      
      let coloursHTML = $('.J_Prop_Color')
      if(coloursHTML) {
        $('li > a > span', '.J_Prop_Color').each(function(i, ele) {
          colours.push($(this).text())
        })
      }
      
      let sizesHTML = $('li > a > span', '.J_Prop_measurement')
      if(sizesHTML) {
        sizesHTML.each(function(i, ele) {
          sizes.push($(this).text())
        })
      }
      
      result["title"] = title
      result["colours"] = colours
      result["sizes"] = sizes
      console.log(result)
      res.send(result)
    })
});

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/haul-reviewer' }
  );
});

app.listen(process.env.PORT || 8080);