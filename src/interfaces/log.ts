
export enum LOGSEVERITY {
    FATAL,
    ERROR,
    WARN,
    INFO,
    VERBOSE,
};

export interface ILogger {
    fatal: (msg: string) => void;
    error: (msg: string) => void;
    warn: (msg: string) => void;
    info: (msg: string) => void;
    verbose: (msg: string) => void;
}
