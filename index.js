var magic = require('stream-mmmagic');
var path = require("path");

var magicAdditions = path.join(__dirname, "misc", "magic");
var defaultMagic = require.resolve("stream-mmmagic/node_modules/mmmagic/magic/magic.mgc");
magic.config.magicFile = magicAdditions+":"+ defaultMagic;
module.exports = magic;
