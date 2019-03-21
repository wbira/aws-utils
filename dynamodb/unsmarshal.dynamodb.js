var fs = require('fs');

var AWS = require('aws-sdk');
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;
var { map, pipe, slice, split, fromPairs } = require('ramda');

var parseOptions = pipe(
  slice(2, Infinity),
  map(split('=')),
  map(([prop, value]) => [prop.replace(/^--/, ''), value]),
  fromPairs
);
var args = parseOptions(process.argv);

console.log(args);
AWS.config.region = args.region;
var dynamoDb = new AWS.DynamoDB();

var data = dynamoDb.scan(
  {
    TableName: args.table
  },
  function(err, data) {
    if (err) {
      console.error(err);
      return;
    }
    var items = data.Items.map(unmarshalItem);
    console.log(items);
    fs.writeFile('test.json', JSON.stringify(items, null, 4));
  }
);
