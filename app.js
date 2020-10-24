const http = require('http');
const url = require('url');
const port = 3000;
const FORM = require('./Page');
const DATA = require('./aws');
const express = require('express');
const app=express();

app.use(express.static('public'));
app.get('/',function(req,res){
    FORM.PageSinhVien(res);
    DATA.getAllItem(res);
})
app.get('/new',function(req,res){
    FORM.PageNew(res);
    res.end();
})
app.get('/saveNew',function(req,res){
    var ID=req.query.ID;
    var MaSinhVien= req.query.MaSinhVien;
    var Ten= req.query.Ten;
    var NgaySinh= req.query.NgaySinh;
    var avata= req.query.avata;
    DATA.createItem(ID, MaSinhVien,Ten,NgaySinh,avata, res);
})
app.get('/save',function(req,res){
    var ID=req.query.ID;
    var MaSinhVien= req.query.MaSinhVien;
    var Ten= req.query.Ten;
    var NgaySinh= req.query.NgaySinh;
    var avata= req.query.avata;
    DATA.updateItem(ID, MaSinhVien,Ten,NgaySinh,avata, res)
})
app.get('/edit',function(req,res){
    var ID=req.query.ID;
    var MaSinhVien= req.query.MaSinhVien;
    var Ten= req.query.Ten;
    var NgaySinh= req.query.NgaySinh;
    var avata= req.query.avata;
    FORM.PageEdit(ID, MaSinhVien, Ten, NgaySinh, avata, res);
    res.end();
})
app.get('/delete',function(req,res){
    var ID=req.query.ID;
    var MaSinhVien= req.query.MaSinhVien;
    DATA.deleteItem(MaSinhVien, ID, res);
})
app.listen(port,function(){
    console.log(`Server starting at port ${port} `);
})

