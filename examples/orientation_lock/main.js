window.onload = function() {
    
    var btnPortrait = document.getElementById('portrait');
    var btnLandscape = document.getElementById('landscape');

    btnPortrait.addEventListener('click', lockFromButton, false);
    btnLandscape.addEventListener('click', lockFromButton, false);

    function lockFromButton(ev) {
        console.log('locking to', this.id);
        lockTo(this.id);
    }

    function lockTo(what) {

        if(what === 'portrait') {
            btnPortrait.enabled = false;
            btnLandscape.enabled = true;
        } else {
            btnPortrait.enabled = true;
            btnLandscape.enabled = false;
        }

        if(window.screen.mozLockOrientation(what)) {
            console.log('Lock success');
        } else {
            console.log('Lock fail');
        }

    }
};
