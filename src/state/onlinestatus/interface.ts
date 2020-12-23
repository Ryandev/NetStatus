
export interface IOnlineStatusState {
    isOnline: boolean;
    dateWasLastOnline: Date;
}

export interface StateModifier<T> {
    type: string;
    apply(modelIn: T): T;
}
