var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "", "secretAccessKey": ""
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "SinhViens",
    KeySchema: [       
        { AttributeName: "MaSinhVien", KeyType: "HASH"}, 
        { AttributeName: "ID", KeyType: "RANGE" } 
    ],
    AttributeDefinitions: [       
        { AttributeName: "MaSinhVien", AttributeType: "S" },
        { AttributeName: "ID", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

 var docClient = new AWS.DynamoDB.DocumentClient();

var allSinhVien = JSON.parse(fs.readFileSync('sinhvienData.json', 'utf8'));
allSinhVien.forEach(function(sinhvien) {
    var paramsput = {
        TableName: "SinhViens",
        Item: {
            "ID":sinhvien.ID,
            "MaSinhVien":sinhvien.MaSinhVien,
            "Ten":sinhvien.Ten,
            "NgaySinh":sinhvien.NgaySinh,
            "avata":sinhvien.avata
        }
    };

    docClient.put(paramsput, function(err, data) {
       if (err) {
           console.error("khong the them sinh vien", sinhvien.Ten, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", sinhvien.Ten);
       }
    });
});
