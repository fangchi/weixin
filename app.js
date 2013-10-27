var express = require('express'),
    weixin = require('weixin-api'),
    app = express();

// 解析器
app.use(express.bodyParser());
//app.use(xmlBodyParser);

// 接入验证
app.get('/', function(req, res) {
    console.log('recive get ');
    // 签名成功
    if (weixin.checkSignature(req)) {
        console.log('passed');
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});

// config
weixin.token = 'fangchi';

// 监听文本消息
weixin.textMsg(function(msg) {
    var resMsg = {};

    switch (msg.content) {
        case "文本" :
            // 返回文本消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "这是从"+msg.toUserName+"发送到"+msg.fromUserName+"的消息,消息发送时间为:"+
                                msg.createTime+",消息内容为:"+msg.content,
                funcFlag : 0
            };
            break;

        case "音乐" :
            // 返回音乐消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "music",
                title : "音乐标题",
                description : "音乐描述",
                musicUrl : "音乐url",
                HQMusicUrl : "高质量音乐url",
                funcFlag : 0
            };
            break;

        case "图文" :

            var articles = [];
            articles[0] = {
                title : "PHP依赖管理工具Composer入门",
                description : "PHP依赖管理工具Composer入门",
                picUrl : "http://weizhifeng.net/images/tech/composer.png",
                url : "http://192.168.1.101/product"
            };

            articles[1] = {
                title : "八月西湖",
                description : "八月西湖",
                picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
                url : "http://weizhifeng.net/bayuexihu.html"
            };

            articles[2] = {
                title : "「翻译」Redis协议",
                description : "「翻译」Redis协议",
                picUrl : "http://weizhifeng.net/images/tech/redis.png",
                url : "http://weizhifeng.net/redis-protocol.html"
            };

            // 返回图文消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : articles,
                funcFlag : 0
            }
    }

    weixin.sendMsg(resMsg);
});

// 监听图片消息
weixin.imageMsg(function(msg) {
    console.log("imageMsg received");
    console.log(JSON.stringify(msg));
});

// 监听位置消息
weixin.locationMsg(function(msg) {
    console.log("locationMsg received");
    console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function(msg) {
    console.log("urlMsg received");
    console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function(msg) {
    console.log("eventMsg received");
    console.log(JSON.stringify(msg));
});

// Start
app.post('/', function(req, res) {
    console.log('recive post ');
    // loop
    weixin.loop(req, res);

});

app.listen(80);
