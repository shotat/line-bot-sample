const express = require('express');
const https = require('https');
const querystring = require('querystring');
const router = express.Router();
const conf = require('config').config

/* GET home page. */
// DEBUG
router.get('/', function(req, res, next) {
  const data = JSON.stringify({
    to: [conf.MyMID],
    toChannel: 1383378250,
    eventType: "138311608800106203",
    content: {
      "contentType":1,
      "toType":1,
      "text": "aaaa"
    }
  });
  sendMsg(data)
  res.render('index', { title: 'Express' });
});

router.post('/', function(orgReq, orgRes, next) {
  const msg = orgReq.body.result[0];
  console.log(msg);
  const data = JSON.stringify({
    to: [msg.content.from],
    toChannel: 1383378250,
    eventType: "138311608800106203",
    content: {
      "contentType":1,
      "toType":1,
      "text": generateResMsg(msg.content.text)
    }
  });
  sendMsg(data)
  orgRes.status(200).send('')
});

function sendMsg(data) {
  const opts = {
    host: 'trialbot-api.line.me',
    path: '/v1/events',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-Line-ChannelID": conf.ChannelID,
      "X-Line-ChannelSecret": conf.ChannelSecret,
      "X-Line-Trusted-User-With-ACL": conf.TrustedUserWithACL
    },
    method: 'POST'
  };

  const req = https.request(opts, function(res){
    console.log(res.statusCode);
    res.on('data', function(chunk){
      console.log(chunk.toString());
    }).on('error', function(e){
      console.log('ERROR: '+ e.stack);
    });
  });
  req.write(data);
  req.end();
}

function generateResMsg(msg) {
  return 'hogehogehogehoge'
}


module.exports = router;
