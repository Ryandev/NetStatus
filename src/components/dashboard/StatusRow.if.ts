
export enum Status {
    Good = "Good",
    Warning = "Warning",
    Bad = "Bad",
};

export interface IStatusProps {
    name: string;
    value: string;
    status: Status;
};
