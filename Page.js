const { Console } = require('console');
const fs = require('fs');

function PageSinhVien(res) {
    let data = fs.readFileSync('HTML/PageSinhVien.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }
function PageNew(res) {
    let data = fs.readFileSync('HTML/PageNew.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }
function PageEdit(ID, MaSinhVien, Ten, NgaySinh, avata,res) {
    let data = fs.readFileSync('HTML/PageEdit.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    data = insertID(ID, data);
    data = insertMaSinhVien(MaSinhVien, data);
    data = insertTen(Ten, data);
    data = insertNgaySinh(NgaySinh, data);
    data = insertavata(avata, data);   
    res.write(data);
  }

function insertID(ID, data) {
    let strInputID = '<input class="input-form size-input" name="ID" type="text" readonly="readonly" />';
    let indexID = data.indexOf(strInputID) + 7;
    return data.substr(0, indexID) + `value='${ID}'` + data.substr(indexID);
  }
function insertMaSinhVien(MaSinhVien, data) {
    let strInputMaSinhVien = '<input class="input-form size-input" name="MaSinhVien" type="text" readonly="readonly" />';
    let indexMaSinhVien = data.indexOf(strInputMaSinhVien) + 7;
    return data.substr(0, indexMaSinhVien) + `value='${MaSinhVien}'` + data.substr(indexMaSinhVien);
  }
function insertTen(Ten, data) {
    let strInputTen = '<input class="input-form size-input" name="Ten" type="text" required />';
    let indexTen = data.indexOf(strInputTen) + 7;
    return data.substr(0, indexTen) + `value='${Ten}'` + data.substr(indexTen);
  }
function insertNgaySinh(NgaySinh, data) {
    let strInputNgaySinh = '<input class="input-form size-input" name="NgaySinh" type="date" required />';
    let indexNgaySinh = data.indexOf(strInputNgaySinh) + 7;
    //${NgaySinh}
    return data.substr(0, indexNgaySinh) + `value='${NgaySinh}'` + data.substr(indexNgaySinh);
  }
function insertavata(avata, data) {
    let strInputavata = '<input class="input-form size-input" name="avata" type="text" required />';
    let indexavata = data.indexOf(strInputavata) + 7;
    return data.substr(0, indexavata) + `value='${avata}'` + data.substr(indexavata);
  }

function writeItemTable(obj, res) {
    res.write('<table class="table table-striped table-bordered table-list" border="1px solid black" style="margin-left:250px;width:80%;">');
    res.write('<thead> <tr><th>ID</th> <th>Mã sinh viên</th><th style="width:auto;">Tên</th> <th style="width:auto;">Ngày sinh</th><th style="width:auto;">avata</th>');
    if (obj.err) {
      res.write(`<h5 style="color:red;">Error:: ${obj.err}</h5>`);
      res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
      if (obj.data.Items.length === 0) {
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
      }
      obj.data.Items.forEach((sinhvien) => {
        res.write(`<tr>
        <td >${sinhvien.ID}</td>
        <td >${sinhvien.MaSinhVien}</td>
        <td>${sinhvien.Ten}</td>
        <td>${sinhvien.NgaySinh}</td>
        <td>${sinhvien.avata}</td>`);
        res.write(`<td><a href="/edit?ID=${sinhvien.ID}&MaSinhVien=${sinhvien.MaSinhVien}&Ten=${sinhvien.Ten}&NgaySinh=${sinhvien.NgaySinh}&avata=${sinhvien.avata}">Sửa</a></td>`);
        res.write(`<td><a href="/delete?MaSinhVien=${sinhvien.MaSinhVien}&ID=${sinhvien.ID}">Xóa</a></td>`);       
      });
    }
    res.write('</table>' );
    res.end();
  }

  module.exports = {
    PageSinhVien:PageSinhVien,
    writeItemTable:writeItemTable,
    PageNew:PageNew,
    PageEdit:PageEdit
}