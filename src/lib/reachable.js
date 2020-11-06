
const PINGSTATUS = {
    INIT: 'init',
    RUNNING: 'running',
    PASSED: 'passed',
    FAILED_ERROR: 'failed_error',
    FAILED_TIMEOUT: 'failed_timeout',
};

const ImageChecker = function(address, callback, timeout=1500) {
    this.status = PINGSTATUS.INIT;
    this.callback = callback;
    this.address = address;

    var _that = this;

    this.isRunning = () => _that.status === PINGSTATUS.RUNNING;
    this.isOnline = () => _that.status === PINGSTATUS.PASSED; 
    this.isOffline = () => _that.status === PINGSTATUS.FAILED_ERROR || _that.status === PINGSTATUS.FAILED_TIMEOUT;

    this._updateResult = function(newStatus) {
        if ( !_that.isRunning() ) { return; }
        if ( !_that.callback ) { return; }
        _that.status = newStatus;
        _that.callback(_that);
        _that.callback = null;
    }

    this.img = new Image();
    this.img.onload = function (a,b,c) {
        _that._updateResult(PINGSTATUS.PASSED);
    };
    this.img.onerror = function (e) {
        _that._updateResult(PINGSTATUS.FAILED_ERROR, e);
    };

    this.start = function() {
        _that.status = PINGSTATUS.RUNNING;
        _that.start = new Date().getTime();
        _that.timer = setTimeout(function () {
            _that._updateResult(PINGSTATUS.FAILED_TIMEOUT);
        }, timeout);
        _that.img.src = address;
    }

    this.start();
};

const canReach = function(website, callback) {
    /* append time=$EPOCH, to prevent browser caching result */
    const url = website + '/favicon.ico?time=' + parseInt(new Date().getTime()/1000);
    const  checker = new ImageChecker(url, callback);
};

export default {
    canReach,
    status : PINGSTATUS,
};
