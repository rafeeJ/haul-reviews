const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static('./dist/haul-reviewer'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/haul-reviewer' }
  );
});

app.listen(process.env.PORT || 8080);