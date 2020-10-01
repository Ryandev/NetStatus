import model from '../model';
import log from './log';

function createRunner(testPoints) {
    var runnerTest = new window.Speedtest();
    runnerTest.setParameter("telemetry_level", "none");
    runnerTest.addTestPoints(testPoints);
    return runnerTest;
}

function startRunner(testServers) {
    var runnerTest = createRunner(testServers);

    return new Promise(function (resolve, reject) {
        var speedTest = new model.SpeedTest();

        runnerTest.onupdate = function (data) {
            log.verbose('Test runner update ' + JSON.stringify(data));
            speedTest.updateWithData(data);
        };

        runnerTest.onend = function () {
            log.verbose('Test runner completed');
            resolve(speedTest);
        };

        runnerTest.selectServer(function (server) {
            if (server) {
				log.info('Finished selecting server ' + JSON.stringify(server) + ', starting speed test');
                runnerTest.start();
            } else {
				log.error('No test runner server found');
                reject('Failed to find server to start update');
            }
        });
    });
}

export default {
    start : startRunner
};
