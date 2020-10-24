const AWS = require('aws-sdk');
const FORM = require('./Page');

AWS.config.update({
  "region": "us-east-2",
  "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": "", "secretAccessKey": ""
});
let docClient = new AWS.DynamoDB.DocumentClient();
function getAllItem(res) {
    let params = {
      TableName: "SinhViens"
    };
    let scanObject = {};
    docClient.scan(params, (err, data) => {
      if (err) {
        scanObject.err = err;
      } else {
        scanObject.data = data;
      }
      FORM.writeItemTable(scanObject, res);
    });
  }
  function createItem(ID, MaSinhVien,Ten,NgaySinh,avata, res) {
    let params = {
      TableName: 'SinhViens',
      Item: {
        "ID":String(ID),
        "MaSinhVien":String(MaSinhVien),
        "Ten":String(Ten),
        "NgaySinh":String(NgaySinh),
        "avata":String(avata)
      }
    };
    docClient.put(params, (err, data) => {
      if (err) {
        FORM.CreateForm(res);
        res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
      } else {
        res.writeHead(302, {'Location': '/'});
      }
      res.end();
    });
  }
  function updateItem(ID, MaSinhVien,Ten,NgaySinh,avata, res) {
    let params = {
      TableName: 'SinhViens',
      Key:{
        "MaSinhVien": String(MaSinhVien),
        "ID": String(ID)
      },
      UpdateExpression: "set #ten=:Ten,#ns=:NgaySinh, #avata=:Avata",
      ExpressionAttributeNames: {
        '#ten':'Ten',
        '#ns':'NgaySinh',
        '#avata':'avata',
      },
      ExpressionAttributeValues:{
        ':Ten':String(Ten),
        ':NgaySinh':String(NgaySinh),
        ':Avata':String(avata),
      },
      ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
      if (err) {
        FORM.writeEditForm(ID, MaSinhVien,Ten,NgaySinh,avata, res);
        res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
      } else {
        res.writeHead(302, {'Location': '/'});
      }
      res.end();
    })
  }

  function deleteItem(MaSinhVien,ID,res) {
    let params = {
      TableName: 'SinhViens',
      Key:{
        "MaSinhVien": String(MaSinhVien),
        "ID": String(ID)
      }
    };
  
    docClient.delete(params, (err, data) => {
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        res.writeHead(302, {'Location': '/'});
      }
      res.end();
    });
  }

  module.exports = {
    getAllItem:getAllItem,
    createItem:createItem,
    updateItem:updateItem,
    deleteItem:deleteItem
  }