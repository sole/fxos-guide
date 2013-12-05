window.onload = function() {

    var pictures = document.getElementById('pictures');
    var controls = document.getElementById('controls');
    var buttonChoose = document.querySelector('button');
    var inputFile = document.querySelector('input');

    if( window.MozActivity ) {
        buttonChoose.style.display = 'inline';
        buttonChoose.addEventListener('click', launchActivity, false);
    } else {
        inputFile.addEventListener('change', onImagePicked, false);
        inputFile.style.display = 'inline';
    }


    function onImagePicked(ev) {

        var files = ev.target.files;
        if(files && files.length > 0) {
            addImage(files[0]);
        }

    }


    function addImage(blob) {

        var url = window.URL.createObjectURL(blob);
        var img = document.createElement('img');
        img.src = url;
        window.URL.revokeObjectURL(url);
        pictures.appendChild(img);

    }


    function launchActivity() {

        var activity = new MozActivity({
            name: 'pick',
            data: {
                type: [ 'image/jpeg', 'image/jpg', 'image/png' ]
            }
        });

        activity.onsuccess = function() {
            var pictureBlob = this.result.blob;
            addImage(pictureBlob);
        };

        activity.onerror = function() {
            // This can be called if the activity is cancelled without picking any image
            console.log(this.error);
        };

    }

};
