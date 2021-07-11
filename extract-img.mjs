import fs from 'fs';
import ba64 from 'ba64';
import slugify from '@sindresorhus/slugify';

/*const lists = fs.readdirSync('data');

lists.forEach(function (plist) {
    const pl = JSON.parse(fs.readFileSync('data/' + plist)),
        image = pl.image ? pl.image.trim().replace('image/jpeg;', 'image/jpg;') : '',
        name = plist.replace('.bplist', '');

    ba64.writeImageSync('images/' + name, image);
});*/

const api = JSON.parse(fs.readFileSync('api/playlistAPI.json'));

api.forEach(function(item) {
    const image = item.image.trim().replace('image/jpeg;', 'image/jpg;'),
        date = new Date(item.playlistDate),
        name = date.toISOString().substring(2,10) + '_' + slugify(item.playlistTitle);

    ba64.writeImageSync('images/small/' + name, image);
});
