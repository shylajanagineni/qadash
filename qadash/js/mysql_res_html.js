const http = require('http');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'qadb',
  charset: 'utf8'
});

//html string that will be send to browser
var reo ='<html><head><title>Node.js MySQL Select</title></head><body><h1>Node.js MySQL Select</h1>{${table}}</body></html>';

//sets and returns html table with results from sql select
//Receives sql query and callback function to return the table
function setResHtml(sql, cb){
  pool.getConnection((err, con)=>{
    if(err) throw err;

    con.query(sql, (err, res, cols)=>{
      if(err) throw err;

      var table =''; //to store html table

      //create html table with data from res.
      for(var i=0; i<res.length; i++){
        table +='<tr><td>'+ (i+1) +'</td><td>'+ res[i].feature +'</td><td>'+ res[i].day10 +'</td><td>'+ res[i].day09+'</td><td>'+ res[i].day08+'</td><td>'+ res[i].day07+'</td><td>'+ res[i].day06+'</td><td>'+ res[i].day05+'</td><td>'+ res[i].day04+'</td><td>'+ res[i].day03+'</td><td>'+ res[i].day02+'</td><td>'+ res[i].day01+'</td></tr>';
      }
      table ='<table border="1"><tr><th>Nr.</th><th>Name</th><th>Address</th></tr>'+ table +'</table>';

      con.release(); //Done with mysql connection

      return cb(table);
    });
  });
}

let sql ='SELECT feature, day10 , day09, day08, day07, day06, day05, day04, day03, day02, day01 FROM sprintb';

//create the server for browser access
const server = http.createServer((req, res)=>{
  setResHtml(sql, resql=>{
    reo = reo.replace('{${table}}', resql);
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write(reo, 'utf-8');
    res.end();
  });
});

server.listen(8080, ()=>{
  console.log('Server running at //localhost:8080/');
});