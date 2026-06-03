const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.js')) results.push(file);
    }
  });
  return results;
}

const files = [...walk(path.join(__dirname, 'config')), ...walk(path.join(__dirname, 'routes'))];

let updatedFiles = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/FROM\s+\\?`?groups\\?`?\b/g, 'FROM groups')
    .replace(/INTO\s+\\?`?groups\\?`?\b/g, 'INTO groups')
    .replace(/UPDATE\s+\\?`?groups\\?`?\b/g, 'UPDATE groups')
    .replace(/FROM groups\b/g, 'FROM \\`groups\\`')
    .replace(/INTO groups\b/g, 'INTO \\`groups\\`')
    .replace(/UPDATE groups\b/g, 'UPDATE \\`groups\\`');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed:', file);
    updatedFiles++;
  }
});

console.log('Total files fixed:', updatedFiles);
