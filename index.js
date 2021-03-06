// var csv=require('fast-csv')
// var csv=require('csv')
var csvtojson = require('csvtojson')
var csv = require('csv')
var fastCsv = require('fast-csv')
var csvFile = '1.csv'
var outputFile = "output.txt";
console.time("fast-csv")
testFastCsv(function () {
  console.timeEnd("fast-csv")
  console.time("csv")
  testCsv(function () {
    console.timeEnd("csv")
    console.time("csvtojson")
    testCsvToJson(function () {
      console.timeEnd("csvtojson")
    })
  })
})

function testCsvToJson(cb) {
  var fileName = "csvtojson-" + outputFile;
  var ws = require('fs').createWriteStream(fileName)
  csvtojson({
    noheader: true
  })
    .fromFile(csvFile)
    .on("csv", function (d) {
      ws.write(d[0] + "\n")
    })
    .on("end", function () {
      cb()
    })
}

function testFastCsv(cb) {
  var fileName = "fastcsv-" + outputFile;
  var ws = require('fs').createWriteStream(fileName)
  fastCsv
    .fromPath(csvFile)
    .on("data", function (d) {
      ws.write(d[0] + "\n")
    })
    .on("end", function () {
      cb()
    })
}

function testCsv(cb) {
  var fileName = "csv-" + outputFile;
  var ws = require('fs').createWriteStream(fileName)
  var rs = require('fs').createReadStream(csvFile)
  var stream=csv.parse();
  rs.pipe(stream)
  .on("data",function(d){
    ws.write(d[0] + "\n")
  })
  .on("end",function(){
    cb();
  })
}
