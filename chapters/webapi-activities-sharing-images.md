# Sharing images

Assuming ```blob``` is a binary blob containing the image, ```filename``` is the image filename, (e.g. _image123.jpg_) and ```fileType``` an string containing the mime type (e.g. _image/png_):

```javascript

var activity = new MozActivity({
    name: 'share',
    data: {
        type: fileType,
        number: 1,
        blobs: [ blob ],
        filenames: [ filename ],
        fullpaths: [ filename ]
    }
});

activity.onerror = function(e) {
    // If there are no activities registered for this intent
    if(activity.error.name === 'NO_PROVIDER') {
        alert('no provider');
    } else {
        alert('error', activity.error.name);
        console.log(activity.error);
    }
};

```

If your image is base64 encoded, as it can be when you extract it from a canvas with [toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement#Example.3A_Getting_the_data-url_for_a_canvas), you can convert it into a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) with this function ([source](http://stackoverflow.com/a/16245768/205721)):

```javascript
function b64ToBlob(b64Data, contentType, sliceSize) {
    
    contentType = contentType || '';
    sliceSize = sliceSize || 1024;
    function charCodeFromCharacter(c) {
        return c.charCodeAt(0);
    }

    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = Array.prototype.map.call(slice, charCodeFromCharacter);
        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
```

An example of usage with a PNG image would be:

```javascript
var blob = b64ToBlob(base64Data.replace('data:image/png;base64,', ''));
```
