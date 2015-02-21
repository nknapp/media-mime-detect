var loadData = require("video-testdata-loader");
var fs = require("fs");
var magic = require("../");
var path = require("path");
var tempfile = require("tempfile")(".tests");


module.exports.setUp = function (callback) {
    fs.mkdirSync(tempfile);
    callback();
};

module.exports.tearDown = function (callback) {
    require("rimraf").sync(tempfile);
    callback();
};

/**
 * Verify the mime-type of the file via a ReadStream using magic
 * and verify that the stream contents has not been damaged
 * @param execptedMimeType
 * @param test
 */
function verifyMimeType(execptedMimeType, test) {
    return function (err, file) {
        test.expect(2);
        if (err) {
            throw err;
        }
        var stream = fs.createReadStream(file);
        magic(stream, function (err, mime, output) {
            if (err) {
                throw err;
            }
            test.equal(mime.type, execptedMimeType);
            var targetFile = path.join(tempfile, path.basename(file));
            var writeStream = fs.createWriteStream(targetFile);
            output.pipe(writeStream);
            writeStream.on("finish", function () {
                var source = fs.readFileSync(file);
                var target = fs.readFileSync(targetFile);
                test.ok(source.equals(target), "Source and target file contents must match.");
                test.done();
            });
        });
    }
}


module.exports.mp4_1 = function (test) {
    var verifier = verifyMimeType("video/mp4",test);
    loadData("1-video-streamable.mp4", verifier);
};


module.exports.mp4_2 = function (test) {
    var verifier = verifyMimeType("video/mp4",test);
    loadData("2-video-unstreamable.mp4", verifier);
};

module.exports.mp2t = function (test) {
    var verifier = verifyMimeType("video/mp2t",test);
    loadData("panasonic-lumix-dmc-zx3.tar", "PRIVATE/AVCHD/BDMV/STREAM/00000.MTS", verifier);
};


module.exports.gif = function (test) {
    var verifier = verifyMimeType("image/gif",test);
    verifier(null, require.resolve("../testImages/animatedGif.gif"));
};
