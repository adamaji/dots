var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);

client.set('foo', 'bar');
client.get('foo', function (err, reply) {
	console.log(reply.toString()); // Will print `bar`
});

