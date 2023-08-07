const fs = require("fs");
const path = require("path");

const imageDataRevamp = [];

fs.readdirSync(path.join(__dirname, '/')).forEach(fileName => {
    if (fileName !== 'export-icon.js') {
        const data = fs.readFileSync(path.join(__dirname, '/' + fileName));
        imageDataRevamp.push({ name: fileName, data });
    }
});

module.exports.imageDataRevamp = imageDataRevamp;