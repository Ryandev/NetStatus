
export interface ILog {
    levels: {
        verbose: boolean;
        info: boolean;
        warn: boolean;
        error: boolean;
        fatal: boolean;
    }
}

export interface IPing {
    testInterval: number;
    servers: string[];
}

export interface IServerConfiguration {
    name: string;
    server: string;
    id: number;
    dlURL: string;
    ulURL: string;
    pingURL: string;
    getIpURL: string;
    sponsorName: string|null;
    sponsorURL: string|null;
}

export interface ISpeedTest {
    testInterval: number;
    serverConfigurations: Array<IServerConfiguration>;
}

export interface IThreshold {
    upload: {
        warning: number;
        error: number;
    },
    download: {
        warning: number;
        error: number;
    },
    latency: {
        warning: number;
        error: number;
    },
    jitter: {
        warning: number;
        error: number;
    }
}

export interface IView {
    refreshPageInterval: number;
}

export interface IConfig {
    logging: ILog,
    ping: IPing,
    speedtest: ISpeedTest,
    threshold: IThreshold,
    view: IView,
}
