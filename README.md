# InfoServer

static file server that provides as much info as possible about the files.

## Usage

```
npm install --save InfoServer
```

Then, in your js:

```js
var infoServer = require('infoserver');
infoServer(filePath)
    .then(function(fileInfo){
        console.log(fileInfo);
    })
    .catch(function(err){
        console.log(err);
    });
```

Or as an http server:
```js
var infoServer = require('infoserver') 
var server = infoServer.server;
var rootDir = __dirname;
var port = 1337;
var prefix = 'xinfo';
server(port,rootDir,prefix,function(){console.log('server listening on '+port)})
```
The server can act as a file browser if `?read` is appended to the url; in this case, you'll find all the meta-data
in the headers.
The final function is optional.
(go to `server/` and run `index.js` to check an example of server)


or as an express middleWare:
```js
var app = require('express').app
var rootDir = __dirname;
var key = 'xinfo'
var infoServer = require('infoserver').middleWare(rootDir,key)
app.use('/metadata',infoServer);
app.use(function(req,res,next){
    var metadata = req[key];
    //do something with the metadata
})
```


-----

## Methods:

#### infoServer([rootDir,]path).then().catch()
fetches metadata for a file located at `path` and returns it.  
Optional `rootDir` gets prepended to `path` and removed from a file's `fullPath` property.

### infoServer.server(port,rootDir,prefix)
fetches metadata and returns it in the browser as json. `port` specifies the port to listen on;
`rootDir` is the public directory, and `prefix` is used to prepend to headers.

### infoServer.middleWare(rootDir,prefix)
Acts the same as `server`. the `prefix` is used to set the fetched data on the `request` object.

----

## Anatomy

Here is an example data returned by infoServer:

```js
{
    "isDirectory": false,
    "isFile": true,
    "dev": 2051,
    "mode": 33184,
    "nlink": 1,
    "uid": 1000,
    "gid": 1000,
    "rdev": 0,
    "blksize": 4096,
    "ino": 6323559,
    "blocks": 1360,
    "atime": "2015-07-28T18:52:33.497Z",
    "mtime": "2015-03-21T12:41:15.344Z",
    "ctime": "2015-07-28T18:52:33.424Z",
    "birthtime": "2015-07-28T18:52:33.424Z",
    "mimetype": "image/jpeg",
    "mime": [
        "image",
        "jpeg"
    ],
    "path": "public/directory/frontblueprint.jpg",
    "fullPath": "public/directory/frontblueprint.jpg",
}
```

#### Additionally:

- text files will have a property called `fileContents` that contains the text
- yaml, ini, xml, json files are treated as text files, but will also contain a property `data` that contains the parsed data, or `error` that contains the error produced while trying to parse
- mp3s will have a property called `tags` containing id3 v1 and v2 tags
- images will have a `size` property containing their size, and an `exif` property containing exif data.

Example of additional image properties:
```js
{
    "size": {
        "height": 1535,
        "width": 2269,
        "type": "jpg"
    },
    "exif": {
        "image": {
            "Orientation": 1,
            "XResolution": 200,
            "YResolution": 200,
            "ResolutionUnit": 2,
            "Software": "Adobe Photoshop CS Windows",
            "ModifyDate": "2004:05:20 20:21:43",
            "ExifOffset": 164
        },
        "thumbnail": {
            "Compression": 6,
            "XResolution": 72,
            "YResolution": 72,
            "ResolutionUnit": 2,
            "ThumbnailOffset": 302,
            "ThumbnailLength": 4438
        },
        "exif": {
            "ColorSpace": 65535,
            "ExifImageWidth": 2269,
            "ExifImageHeight": 1535
        },
        "gps": {},
        "interoperability": {},
        "makernote": {}
    }
}
```

Example of additional mp3 properties:
```js
{
    "tags": {
        "title": "Allegro from Duet in C Major",
        "album": "Some Album",
        "artist": "Someone",
        "year": "2000",
        "v1": {
            "title": "Allegro from Duet in C Major",
            "artist": "Someone",
            "album": "Some Album",
            "year": "2000",
            "comment": "",
            "track": 1,
            "version": 1.1,
            "genre": "Classical"
        },
        "v2": {
            "version": [4,0],
            "title": "Allegro from Duet in C Major",
            "artist": "Someone",
            "album": "Some Album",
            "genre": "Classical",
            "recording-time": "2000",
            "track": "1",
            "copyright": "",
            "language": "",
            "publisher": ""
        }
    }
}
```


---

## License

MIT