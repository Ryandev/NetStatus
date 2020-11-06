import log from '../lib/log';

function SpeedTest() {
    this.ispLocation = '';
    this.downloadSpeed = null;
    this.uploadSpeed = null;
    this.latency = null;
    this.jitter = null;
    this.dateOfLastTest = null;
    this.isTestRunning = false;

    this.updateWithData = function (data) {
        const searchValue = (objSearch, valueSearch, defaultValue) => {
            for (var i = 0; i < valueSearch.length; i++) {
                const key = valueSearch[i];
                const val = objSearch[key];
                if (val !== undefined) {
                    return val;
                }
            }
            return defaultValue;
        }

        function ispLocation(objSearch, defaultValue = '') {
            var val = searchValue(objSearch, [
                'clientIp', 'ispLocation'
            ], defaultValue);
            return val !== undefined
                ? val
                : defaultValue;
        }

        function dlValue(objSearch, defaultValue = -1) {
            var val = parseFloat(searchValue(objSearch, [
                'dlStatus', 'downloadSpeed'
            ], defaultValue));
            return isNaN(val)
                ? defaultValue
                : val;
        }

        function ulValue(objSearch, defaultValue = -1) {
            var val = parseFloat(searchValue(objSearch, [
                'ulStatus', 'uploadSpeed'
            ], defaultValue));
            return isNaN(val)
                ? defaultValue
                : val;
        }

        function latencyValue(objSearch, defaultValue = -1) {
            var val = parseFloat(searchValue(objSearch, [
                'ping', 'pingStatus', 'latency', 'latencyStatus'
            ], defaultValue));
            return isNaN(val)
                ? defaultValue
                : val;
        }

        function jitterValue(objSearch, defaultValue = -1) {
            var val = parseFloat(searchValue(objSearch, [
                'jitter', 'jitterStatus'
            ], defaultValue));
            return isNaN(val)
                ? defaultValue
                : val;
        }

        function dateOfLastTest(objSearch, defaultValue = null) {
            var val = searchValue(objSearch, [
                'dateOfLastTest', 'timeAtLastRun', 'timeOfLastRun'
            ], defaultValue);
            return val
                ? val
                : defaultValue;
        }

        function isTestRunning(objSearch, defaultValue = false) {
            if (objSearch.isTestRunning !== undefined) 
                return Boolean(objSearch.isTestRunning);
            return defaultValue;
        }

        if (ispLocation(data, null)) {
            this.ispLocation = ispLocation(data);
        }

        if (dlValue(data, -1) > -1) {
            this.downloadSpeed = Math.max(this.downloadSpeed, dlValue(data));
        }

        if (ulValue(data, -1) > -1) {
            this.uploadSpeed = Math.max(this.uploadSpeed, ulValue(data));
        }

        if (latencyValue(data, -1) > -1) {
            this.latency = Math.max(this.latency, latencyValue(data));
        }

        if (jitterValue(data, -1) > -1) {
            this.jitter = Math.max(this.jitter, jitterValue(data));
        }

        if (dateOfLastTest(data, null)) {
            this.dateOfLastTest = dateOfLastTest(data);
        }

        if (isTestRunning(data, null)) {
            this.isTestRunning = isTestRunning(data);
        }

        log.verbose('Updated SpeedTest to: ' + JSON.stringify(this));
    }
}

SpeedTest.deserialize = function (data) {
    var copy = new SpeedTest();
    copy.ispLocation = data.ispLocation;
    copy.downloadSpeed = data.downloadSpeed;
    copy.uploadSpeed = data.uploadSpeed;
    copy.latency = data.latency;
    copy.jitter = data.jitter;
    copy.dateOfLastTest = data.dateOfLastTest;
    copy.isTestRunning = data.isTestRunning;
    return copy;
}

function OnlineStatus() {
    this.isOnline = false;
    this.dateWasLastOnline = null;

    this.updateWithData = function (newStatus) {
        const wasOnline = this.isOnline;
        this.isOnline = newStatus;
        if (!this.isOnline && wasOnline) {
            this.dateWasLastOnline = new Date();
        }
    }
};

OnlineStatus.deserialize = function (data) {
    var copy = new OnlineStatus();
    copy.isOnline = data.isOnline;
    return copy;
};

export default {
    SpeedTest,
    OnlineStatus
}