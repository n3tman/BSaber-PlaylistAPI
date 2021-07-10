var fs = require('fs'),
    lists = fs.readdirSync('data'),
    scraped = JSON.parse(fs.readFileSync('beatSaverScrappedData.json'));

lists.forEach(function (plist) {
    var pl = JSON.parse(fs.readFileSync('data/' + plist)),
        title = pl.playlistTitle ? pl.playlistTitle.trim() : 'Unknown Title',
        author = pl.playlistAuthor ? pl.playlistAuthor.trim() : 'Unknown Author',
        desc = pl.playlistDescription ? pl.playlistDescription.trim() : '',
        image = pl.image ? pl.image.trim() : '',
        sync = 'https://bsaber.com/PlaylistAPI/' + plist,
        songs = [];

    console.log('\n----------------------\n' + plist);

    /*pl.songs.forEach(function (song) {
        var hash = song.hash.trim().toLowerCase();

        var map = scraped.find(function(o) {
            return o.hash.toLowerCase() === hash;
        });

        if (map) {
            songs.push({
                "key": map.key,
                "hash": map.hash,
                "songName": map.name.trim(),
                "uploader": map.uploader.username
            })
        } else {
            console.log('Map seems to be deleted! URL: https://beatsaver.com/api/maps/by-hash/' + hash)
        }
    });*/

    var result = {
        "playlistTitle": title,
        "playlistAuthor": author,
        "playlistDescription" : desc,
        "syncURL": sync,
        "songs": pl.songs,
        "image": image
    }

    fs.writeFileSync('data/' + plist, JSON.stringify(result, null, 4));
});
