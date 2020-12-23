
export interface IEnv {
    getInt : (envName: string, defaultValue?: number) => number;
    getBool : (envName: string, defaultValue?: boolean) => boolean;
    getObject : (envName: string, defaultValue?: object) => object;
    getArray : <T>(envName: string, defaultValue?: Array<T>) => Array<T>;
};
