
import IOC from '../../ioc'
import { IServerConfiguration } from '../../interfaces/config';
import { ILogger } from '../../interfaces/log';
import model from './model';
import { INetworkSpeedState, ISpeedRunner } from './interface';


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

interface ISpeedRunnerPrivate extends ISpeedRunner {
    runner: any;
    flagIsReady: boolean;
}

function makeRunner(testServers: IServerConfiguration[], log: ILogger = IOC().logger()): ISpeedRunner {
    const runner = new (window as any).Speedtest();
    runner.setParameter("telemetry_level", "none");
    runner.addTestPoints(testServers);

    const returnRunner: ISpeedRunnerPrivate = {
        runner,
        flagIsReady: false,
        isReady: function(this: ISpeedRunnerPrivate) {
            return this.flagIsReady;
        },
        ready: function(this: ISpeedRunnerPrivate) {
            if ( this.flagIsReady ) { return Promise.resolve() }

            const self = this;

            return new Promise(function(resolve, reject) {
                self.runner.selectServer(function (server: IServerConfiguration) {
                    if (server) {
                        log.info('Finished selecting server ' + JSON.stringify(server) + ', starting speed test');
                        self.flagIsReady = true;
                        resolve();
                    } else {
                        log.error('No test runner server found');
                        reject('Failed to find server to start update');
                    }
                });
            })
        },
        run: function(this: ISpeedRunnerPrivate) {
            if ( !this.flagIsReady ) { return Promise.reject("Cannot run speed test before running ready()") }

            const runner = this.runner;
            runner.onupdate = null;
            runner.onend = null;

            return new Promise(function(resolve, reject) {
                let speedTest = model();

                runner.onupdate = function(data: IRunnerData) {
                    log.verbose('Test runner update ' + JSON.stringify(data));
                    const updateData: Partial<INetworkSpeedState> = {
                        ispLocation: data.clientIp,
                        downloadSpeed: parseFloat(data.dlStatus),
                        uploadSpeed: parseFloat(data.ulStatus),
                        latency: parseFloat(data.pingStatus),
                        jitter: parseFloat(data.jitterStatus),
                        isTestRunning: true,
                    }
                    speedTest = speedTest.apply(updateData);
                };
        
                runner.onend = function (wasAborted: boolean) {
                    log.verbose('Test runner completed');
                    resolve(speedTest);
                };
    
                runner.start();
            })
        },
    }

    return returnRunner;
}

export default makeRunner;
