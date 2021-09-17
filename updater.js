var fs = require('fs'),
    listDir = 'data/',
    request = require('sync-request'),
    files = fs.readdirSync(listDir);

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function asyncForEach(arr, callback, ms) {
    for (var item of arr) {
        await sleep(ms);
        callback(item);
    }
}

async function processSongs() {
    for (var id in files) {
        var name = listDir + files[id];
        var plist = JSON.parse(fs.readFileSync(name));
        console.log(name);

        var songs = [];

        await asyncForEach(plist.songs, function (song) {
            var url = 'https://api.beatsaver.com/maps/id/' + song.key;
            console.log(url);
            var res = request('GET', url);
            var status = res.statusCode;

            if (status === 200) {
                var json = JSON.parse(res.getBody('utf-8'));
                if (json.versions[0].state === 'Published') {
                    var result = {
                        "key": json.id,
                        "hash": json.versions[0].hash,
                        "name": json.name.trim(),
                        "uploader": json.uploader.name
                    };

                    if (song.hasOwnProperty('customData')) {
                        result.customData = song.customData;
                    }

                    songs.push(result);
                }
            }
        }, 1000);

        plist.songs = songs;
        fs.writeFileSync(name, JSON.stringify(plist, null, 4));
    }
}

processSongs();
