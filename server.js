var redis = require('redis-url').connect(process.env.REDISTOGO_URL);

redis.set('foo', 'bar');
redis.get('foo', function(err, value) {
  console.log('foo is: ' + value);
});

