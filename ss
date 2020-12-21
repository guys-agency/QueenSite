 && rimraf build/**/*.map && gzipper c ./build --exclude jpg,JPG
 "postbuild": "rimraf build/**/*.map",