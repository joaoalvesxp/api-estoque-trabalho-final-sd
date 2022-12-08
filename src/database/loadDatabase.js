const fs = require('fs');
const path = require('path');
let data = ""

const path_file = path.resolve("src","database", "database.json");

try {
  data = fs.readFileSync(path_file,'utf-8');
  data = JSON.parse(data)
} catch (err) {
  console.log(err);
  return;
}

function salve(data) {
  
}

module.exports = { data, salve }