
enum PINGSTATUS {
    INIT,
    RUNNING,
    PASSED,
    FAILED_ERROR,
    FAILED_TIMEOUT,
}

interface IReachable {
    status: PINGSTATUS,
    address: string,
    isRunning: ()=>boolean;
    isOnline: ()=>boolean;
    isOffline: ()=>boolean;
    start: ()=>void;
}

interface IImageChecker extends IReachable {
    callback?: (result: IReachable) => void;
    image: any;
    timerHandler: any;
}

const ImageChecker = function(address: string, callback: (result: IReachable)=>void, timeout=5000): IImageChecker {
    function _updateResult(imageChecker: IImageChecker, newStatus: PINGSTATUS, error?: Error) {
        if ( !imageChecker.isRunning() ) { return; }
        if ( !imageChecker.callback ) { return; }
        clearInterval(imageChecker.timerHandler);
        imageChecker.status = newStatus;
        if ( imageChecker.callback ) {
            imageChecker.callback(imageChecker);
            delete imageChecker.callback;
        }
    }

    return {
        status: PINGSTATUS.INIT,
        address,
        isRunning: function(this: IImageChecker) { return this.status === PINGSTATUS.RUNNING; },
        isOnline: function(this: IImageChecker) { return this.status === PINGSTATUS.PASSED; },
        isOffline:  function(this: IImageChecker) { return this.status === PINGSTATUS.FAILED_TIMEOUT; },
        start: function(this: IImageChecker) {
            const _that = this;

            this.image = new Image();
            this.image.onload = function () {
                _updateResult(_that, PINGSTATUS.PASSED);
            };
            this.image.onerror = function (error: Error) {
                _updateResult(_that, PINGSTATUS.FAILED_ERROR, error);
            };
            this.image.onabort = function() {
                _updateResult(_that, PINGSTATUS.FAILED_ERROR, Error("User aborted request"));
            }
        
            this.status = PINGSTATUS.RUNNING;
            this.timerHandler = setTimeout(function () {
                _updateResult(_that, PINGSTATUS.FAILED_TIMEOUT);
            }, timeout);

            /* start the load process */
            this.image.src = address;
        },
        callback,
        image: (new Image()),
        timerHandler: 0,
    };
};

const canReach = function(website: string, callback: (result: IReachable)=>void): IReachable {
    /* append time=$EPOCH, to prevent browser caching result */
    const url = website + '/favicon.ico?time=' + (new Date().getTime()/1000);
    const checker = ImageChecker(url, callback);
    checker.start();
    return checker;
};

const exports = {
    canReach,
    status : PINGSTATUS,
}

export default exports;
