var fs = require('fs'),
    lists = fs.readdirSync('data'),
    result = [];

lists.forEach(function (plist) {
    var pl = JSON.parse(fs.readFileSync('data/' + plist)),
        title = pl.playlistTitle ? pl.playlistTitle.trim() : 'Unknown Title',
        author = pl.playlistAuthor ? pl.playlistAuthor.trim() : 'Unknown Author',
        desc = pl.playlistDescription ? pl.playlistDescription.trim() : '',
        sync = 'https://bsaber.com/PlaylistAPI/' + plist;

    var date = '20' + plist.substring(0,8);
    var authors = [];

    pl.songs.forEach(function (song) {
        if (!authors.includes(song.uploader)) {
            authors.push(song.uploader);
        }
    });

    result.push({
        "playlistTitle": title.replace(/\s+/g, ' '),
        "playlistAuthor": author,
        "playlistDescription" : desc.replace(/\s+/g, ' '),
        "playlistURL": sync,
        "playlistDate": date,
        "playlistCategory": '',
        "playlistSongCount": pl.songs.length,
        "playlistMapperCount": authors.length,
        "image": ''
    });
});

fs.writeFileSync('api/playlistAPI2.json', JSON.stringify(result.reverse(), null, 4));
