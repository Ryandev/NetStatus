
import { ILoadingProps } from "../components/loading/Container.if";
import { IGlobalState } from "../state/interface";


const mapStateToProps = (state: IGlobalState, props: ILoadingProps): ILoadingProps => {
    return {
        title: 'FETCHING NETWORK SPEED',
        subtitle: "(delay upto 1min)",
        iconName: "spinner",
    };
}

export default mapStateToProps;
