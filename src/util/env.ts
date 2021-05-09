
const getProcessVal = (envName: string): any|null => {
    const envVal = process.env[envName];
    return envVal;
};

const getWindowVal = (envName: string): any|null => {
    const envVal = (window as any)?.env?.[envName];
    return envVal;
};

const getInt = (envName: string, defaultValue=-1): number => {
    const envVal = 
        getProcessVal(envName) ?? 
        getWindowVal(envName);
    let retVal = defaultValue

    if ( envVal !== undefined ) {
        retVal = parseInt(envVal);
    }

    return retVal;
}

const getBool = (envName: string, defaultValue=false): boolean => {
    const envVal = 
        getProcessVal(envName) ?? 
        getWindowVal(envName)
    let retVal = defaultValue;

    if ( envVal !== undefined ) {
        retVal = Boolean(envVal);
    }

    return retVal;
}

const getObject = (envName: string, defaultValue={}): object => {
    const envVal = 
        getProcessVal(envName) ?? 
        getWindowVal(envName);
    let retVal = defaultValue;

    if ( envVal !== undefined ) {
        retVal = JSON.parse(envVal);
    }

    return retVal;
}

const getArray = <T>(envName: string, defaultValue: Array<T> = []): Array<T> => {
    const envVal = 
        getProcessVal(envName) ?? 
        getWindowVal(envName);
    let retVal = defaultValue;

    if ( ( envVal !== undefined) && 
         ( typeof envVal === 'object' ) ) {
        retVal = JSON.parse(envVal);
    }

    return retVal;
}

const exports = {
    getInt,
    getBool,
    getObject,
    getArray,
};

export default exports;
