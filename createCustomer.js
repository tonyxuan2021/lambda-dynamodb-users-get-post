const AWS = require('aws-sdk');

module.exports.createCustomer = async (event) => {
  const body = JSON.parse(event.body); // payload

  const { name, email, age } = body;

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  if (!name || !email || !age) {
    return {
      statusCode: 400,
    };
  }

  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: name,
      email: email,
      age: age,
    },
  };

  await dynamodb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};
