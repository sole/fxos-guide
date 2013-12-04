# Picking images

You can ask the system for an image. It will open a dialog offering you all the applications that can handle the `pick` activity and the type of images you specify (e.g. `image/jpeg`). Typical apps include the *Gallery* (so you can choose existing images) and the *Camera* (for taking a new image).

As usual, you create an activity and assign an `onerror` callback. But since we want to *receive* data too, we need to assign it an `onsuccess` callback too.

````javascript
var activity = new MozActivity({
    name: 'pick',
    data: {
        type: [ 'image/jpeg', 'image/jpg', 'image/png' ]
    }
});

activity.onsuccess = function() {
    var picture = this.result;
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(this.result.blob);
    // now do something with the image
};

activity.onerror = function() {
    alert(this.error);
};

````

See the [picking](../examples/web_activities_picking) example for a complete working demonstration (you might need to run it on a Firefox OS device).
