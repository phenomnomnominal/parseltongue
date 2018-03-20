let path = require('path');

module.exports = {
    entry: './dist/parseltongue.client.js',
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: 'parseltongue.js'
    },
    node: {
        fs: 'empty'
    }
};
