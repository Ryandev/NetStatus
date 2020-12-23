
const getInt = (envName: string, defaultValue=-1): number => {
    const envVal: any = process.env[envName];
    let returnValue = defaultValue;

    if ( ( envVal !== undefined ) &&
         ( typeof envVal === 'string' ) ) {
        returnValue = parseInt(envVal);
    }

    return returnValue;
}

const getBool = (envName: string, defaultValue=false): boolean => {
    const envVal = process.env[envName];
    let returnValue = defaultValue;

    if ( ( envVal !== undefined ) &&
         ( typeof envVal === 'boolean') ) {
        returnValue = envVal;
    }

    return returnValue;
}

const getObject = (envName: string, defaultValue={}): object => {
    const envVal = process.env[envName];
    let returnValue = defaultValue;

    if ( ( envVal !== undefined) && 
         ( typeof envVal === 'object' ) ) {
        returnValue = JSON.parse(envVal);
    }

    return returnValue;
}

const getArray = <T>(envName: string, defaultValue: Array<T> = []): Array<T> => {
    const envVal = process.env[envName];
    let returnValue = defaultValue;

    if ( ( envVal !== undefined) && 
         ( typeof envVal === 'object' ) ) {
        returnValue = JSON.parse(envVal);
    }

    return returnValue;
}

const exports = {
    getInt,
    getBool,
    getObject,
    getArray,
};

export default exports;
