const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  { path: 'routes/api/avatar-routes.js', replacement: '../../../config/ImageProcessor' },
  { path: 'routes/api/conversation/message-routes.js', replacement: '../../../config/ImageProcessor' },
  { path: 'routes/api/post/comment-routes.js', replacement: '../../../config/ImageProcessor' },
  { path: 'routes/api/post/post-routes.js', replacement: '../../../config/ImageProcessor' },
  { path: 'config/Group.js', replacement: './ImageProcessor' },
  { path: 'config/User.js', replacement: './ImageProcessor' }
];

filesToUpdate.forEach(item => {
  const filePath = path.join(__dirname, item.path);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/'handy-image-processor'/g, `'${item.replacement}'`);
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Replaced in', item.path);
    }
  }
});
