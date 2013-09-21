var url   = require("url").parse(process.env.OPENREDIS_URL);
var redis = require("redis").createClient(url.port, url.hostname);

redis.auth(url.auth.split(":")[1]);

