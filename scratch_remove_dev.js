const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    if (file === 'node_modules' || file === 'dist' || file === '.git' || file === '.vscode') return;
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('.');
let count = 0;

files.forEach(file => {
  // Only target js, scss, md, txt, hbs files
  if (file.endsWith('.js') || file.endsWith('.scss') || file.endsWith('.md') || file.endsWith('LICENSE') || file.endsWith('.hbs')) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Remove the JSDoc header with the developer's name
    const headerRegex = /\/\*\*\r?\n \* @author Vsocial Team <www\.shvsocial@gmail\.com>[\s\S]*?\*\/\r?\n\r?\n?/g;
    content = content.replace(headerRegex, '');
    
    // Replace names and emails
    content = content.replace(/Vsocial/g, 'Vsocial');
    content = content.replace(/Vsocial/g, 'Vsocial');
    content = content.replace(/vsocial/g, 'vsocial');
    content = content.replace(/Vsocial Team/g, 'Vsocial Team');
    content = content.replace(/Vsocial/gi, 'Vsocial');
    content = content.replace(/www\.shvsocial@gmail\.com/g, 'contact@vsocial.com');
    content = content.replace(/_Vsocial_shaikh/g, 'vsocial');
    content = content.replace(/Shaikh-Vsocial/g, 'Vsocial');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
      count++;
    }
  }
});

console.log(`Total files updated: ${count}`);
