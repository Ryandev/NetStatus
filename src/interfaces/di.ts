
import { Container } from "inversify";


export interface IInjectable<T> {
    addBinding: (container: Container) => void;
    resolve: (container: Container) => T
    type: Symbol;
}
