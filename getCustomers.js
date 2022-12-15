const AWS = require('aws-sdk');

module.exports.getCustomers = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
  };

  // connect to db but also we retrieving all users if there any
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  if (!result.Count) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items.map((customer) => {
        return {
          name: customer.primary_key,
          email: customer.email,
        };
      }),
    }),
  };
};
