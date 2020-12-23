
import { ILoadingProps } from "../components/loading/Container.if";
import { IGlobalState } from "../state/interface";


const mapStateToProps = (state: IGlobalState, props: ILoadingProps): ILoadingProps => {
    return {
        title: 'LOADING',
        subtitle: "",
        iconName: "spinner",
    };
}

export default mapStateToProps;
