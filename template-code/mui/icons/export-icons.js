const fs = require("fs");
const path = require("path");

const imageData = [];

fs.readdirSync(path.join(__dirname, '/')).forEach(fileName => {
    if (fileName !== 'export-icon.js') {
        const data = fs.readFileSync(path.join(__dirname, '/' + fileName));
        imageData.push({ name: fileName, data });
    }
});

module.exports.imageData = imageData;