
import { INetworkSpeedState } from './interface';
import IOC from '../../ioc'
import { ILogger } from '../../interfaces/log';


const searchValue = (objSearch: object, valueSearch: string[], defaultValue: any): any => {
    for (var i = 0; i < valueSearch.length; i++) {
        const key = valueSearch[i];
        const val = (objSearch as any)[key];
        if (val !== undefined) {
            return val;
        }
    }
    return defaultValue;
}

function _updateWithData(
    speedTest: INetworkSpeedState, 
    data: object, 
    log: ILogger = IOC().logger()) {

    function ispLocation(objSearch: object, defaultValue: any = '') {
        var val = searchValue(objSearch, [
            'clientIp', 'ispLocation'
        ], defaultValue);
        return val !== undefined
            ? val
            : defaultValue;
    }

    function dlValue(objSearch: object, defaultValue = -1) {
        var val = parseFloat(searchValue(objSearch, [
            'dlStatus', 'downloadSpeed'
        ], defaultValue));
        return isNaN(val)
            ? defaultValue
            : val;
    }

    function ulValue(objSearch: object, defaultValue = -1) {
        var val = parseFloat(searchValue(objSearch, [
            'ulStatus', 'uploadSpeed'
        ], defaultValue));
        return isNaN(val)
            ? defaultValue
            : val;
    }

    function latencyValue(objSearch: object, defaultValue = -1) {
        var val = parseFloat(searchValue(objSearch, [
            'ping', 'pingStatus', 'latency', 'latencyStatus'
        ], defaultValue));
        return isNaN(val)
            ? defaultValue
            : val;
    }

    function jitterValue(objSearch: object, defaultValue = -1) {
        var val = parseFloat(searchValue(objSearch, [
            'jitter', 'jitterStatus'
        ], defaultValue));
        return isNaN(val)
            ? defaultValue
            : val;
    }

    function dateOfLastTest(objSearch: object, defaultValue = null) {
        var val = searchValue(objSearch, [
            'dateOfLastTest', 'timeAtLastRun', 'timeOfLastRun'
        ], defaultValue);
        return val
            ? val
            : defaultValue;
    }

    function isTestRunning(objSearch: object, defaultValue = false) {
        if ( !objSearch ) { return defaultValue; }

        if ( (objSearch as any)['isTestRunning'] ?? false ) {
            return Boolean((objSearch as any).isTestRunning);
        }

        return defaultValue;
    }

    if (ispLocation(data, null)) {
        speedTest.ispLocation = ispLocation(data);
    }

    if (dlValue(data, -1) > -1) {
        speedTest.downloadSpeed = Math.max(speedTest.downloadSpeed, dlValue(data));
    }

    if (ulValue(data, -1) > -1) {
        speedTest.uploadSpeed = Math.max(speedTest.uploadSpeed, ulValue(data));
    }

    if (latencyValue(data, -1) > -1) {
        speedTest.latency = Math.max(speedTest.latency, latencyValue(data));
    }

    if (jitterValue(data, -1) > -1) {
        speedTest.jitter = Math.max(speedTest.jitter, jitterValue(data));
    }

    if (dateOfLastTest(data, null)) {
        speedTest.dateOfLastTest = dateOfLastTest(data);
    }

    if (isTestRunning(data)) {
        speedTest.isTestRunning = isTestRunning(data);
    }

    log.verbose('Updated SpeedTest to: ' + JSON.stringify(speedTest));
}

function SpeedTest(
        ispLocation: string = 'unknown', 
        downloadSpeed: number = 0,
        uploadSpeed: number = 0,
        latency: number = 0,
        jitter: number = 0,
        isTestRunning: boolean = false,
        dateOfLastTest?: Date
        ): INetworkSpeedState {

    const speedTest: INetworkSpeedState = {
        ispLocation,
        downloadSpeed,
        uploadSpeed,
        latency,
        jitter,
        isTestRunning,

        updateWithData: function(this: INetworkSpeedState, data: object, log: ILogger = IOC().logger()) {
            _updateWithData(this, data, log);
        },
        apply: function (data: Partial<INetworkSpeedState>) {
            const copy = SpeedTest(
                data?.ispLocation ?? '',
                data?.downloadSpeed ?? 0,
                data?.uploadSpeed ?? 0,
                data?.latency ?? 0,
                data?.jitter ?? 0,
                data?.isTestRunning ?? false,
                data?.dateOfLastTest,
            );
            return copy;
        }
        
    }

    if ( dateOfLastTest ) {
        speedTest.dateOfLastTest = dateOfLastTest;
    }

    return speedTest
}

export default SpeedTest;
