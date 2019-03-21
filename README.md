# aws-utils

## dynamoDB json unnmarshaller

If you want to unmarshall DynamoDb json format

```json
  "address": {
    "M": {
      "city": {
        "S": "Wroclaw"
      },
      "countryCode": {
        "S": "fr"
      },
    }
  }
```

to normal one

```json
  "address": {
    "city": "Wroclaw",
    "countryCode": "fr"
    }
  }
```

use following command (you need to be logged in to AWS)

```javascript
npm i
node dynamodb/unsmarshal.dynamodb.js --region=eu-west-1 --table=SomeTableName
```

After that you should get your json in test.json file
