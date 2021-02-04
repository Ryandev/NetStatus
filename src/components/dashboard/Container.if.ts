
export enum DashboardStatusValue {
    Unknown = 0,
    Bad = 1,
    Warning = 2,
    Good = 3,
}

export interface IDashboardStatusItem {
    name: string;
    value: string;
    status : DashboardStatusValue;
}

export interface IDashboardProps {
    statusItems: IDashboardStatusItem[];
    showInfoIcon: boolean;
    infoIcon: "wifi" | "spinner" | "clock";
    infoTextLeft: string;
    infoTextRight: string;
    infoIconRight: "map-marker";
    refreshPageInterval: number;
}
