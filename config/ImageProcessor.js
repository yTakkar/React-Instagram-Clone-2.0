const jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const ProcessImage = async (options) => {
  const { srcFile, destFile, width, height } = options;
  try {
    const image = await jimp.read(srcFile);
    
    // If width and height are provided, resize/cover the image
    if (width && height) {
      image.cover(width, height);
    }
    
    // Write the processed image to the destination
    await image.writeAsync(destFile);
  } catch (error) {
    console.error('Error processing image:', error);
    // If Jimp fails, fallback to simple file copy so the app doesn't crash
    fs.copyFileSync(srcFile, destFile);
  }
};

const DeleteAllOfFolder = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        DeleteAllOfFolder(curPath);
      } else {
        try {
          fs.unlinkSync(curPath);
        } catch(e) {}
      }
    });
  }
};

module.exports = {
  ProcessImage,
  DeleteAllOfFolder
};
