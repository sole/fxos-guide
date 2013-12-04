window.onload = function() {
    
    if( !window.MozActivity ) {
        alert('This environment does not support Web Activities.\nSorry about that :-(\nMaybe try it on Firefox OS?');
        return;
    }

    var pictures = document.getElementById('pictures');
    var button = document.querySelector('input[type=button]');

    button.addEventListener('click', launchActivity, false);

    function launchActivity() {

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
            pictures.appendChild(img);
        };

        activity.onerror = function() {
            alert(this.error);
        };

    }

};
