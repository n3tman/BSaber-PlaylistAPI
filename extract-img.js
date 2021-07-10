var fs = require('fs'),
    ba64 = require('ba64'),
    lists = fs.readdirSync('data');

lists.forEach(function (plist) {
    var pl = JSON.parse(fs.readFileSync('data/' + plist)),
        image = pl.image ? pl.image.trim().replace('image/jpeg;', 'image/jpg;') : '',
        name = plist.replace('.bplist', '');

    ba64.writeImageSync('images/' + name, image);
});
