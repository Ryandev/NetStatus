
import IOC from '../../ioc'
import { IServerConfiguration } from '../../interfaces/config';
import { ILogger } from '../../interfaces/log';
import model from './model';
import { INetworkSpeedState } from './interface';


function createRunner(testPoints: any[]) {
    const runnerTest = new (window as any).Speedtest();
    runnerTest.setParameter("telemetry_level", "none");
    runnerTest.addTestPoints(testPoints);
    return runnerTest;
}

interface IRunnerData {
    testState: number,
    dlStatus: string,
    ulStatus: string,
    pingStatus: string,
    clientIp: string,
    jitterStatus: string,
    dlProgress: number,
    ulProgress: number,
    pingProgress: number,
    testId: null,
}

function startRunner(testServers: IServerConfiguration[], log: ILogger = IOC().logger()): Promise<INetworkSpeedState> {
    var runnerTest = createRunner(testServers);

    return new Promise(function (resolve, reject) {
        let speedTest = model();

        runnerTest.onupdate = function(data: IRunnerData) {
            log.verbose('Test runner update ' + JSON.stringify(data));
            let updateData: Partial<INetworkSpeedState> = {
                ispLocation: data.clientIp,
                downloadSpeed: parseFloat(data.dlStatus),
                uploadSpeed: parseFloat(data.ulStatus),
                latency: parseFloat(data.pingStatus),
                jitter: parseFloat(data.jitterStatus),
                isTestRunning: true,
            }
            speedTest = speedTest.apply(updateData);
        };

        runnerTest.onend = function () {
            log.verbose('Test runner completed');
            resolve(speedTest);
        };

        runnerTest.selectServer(function (server: IServerConfiguration) {
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

export default startRunner;
