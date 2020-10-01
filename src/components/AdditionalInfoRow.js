import React from 'react';
import {connect} from "react-redux";
import constants from '../constants';
import {AdditionalInfoRow as styling} from '../constants/styling';
import {date as dateUtil} from '../lib';


function InfoDisplayRow(props) {
    const iconLeft = props.showIconLeft
        ? <i className={["fa", props.iconLeft].join(" ")}></i>
        : '';
    return (
        <div style={styling.container.primary} className="row">
            <div style={styling.colLeft} className="col-xs-3">
                {iconLeft}
                <span>{props.textLeft}</span>
            </div>
            <div style={styling.colRight} className="col-xs-9">
                <span>{props.textRight}</span>
            </div>
        </div>
    );
}

class AdditionalInfoRow extends React.Component {
    componentDidMount() {
        this._interval = setInterval(() => {
            this.forceUpdate();
        }, 1000 * Math.max(1, constants.view.refreshPageInterval));
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        return InfoDisplayRow({
            showIconLeft: this.props.isTestRunning,
            iconLeft: 'fa-wifi',
            textLeft: this.props.isTestRunning
                ? ''
                : dateUtil.describeDifferenceBetweenDates(this.props.dateOfLastTest, new Date()),
            textRight: this.props.ispLocation
        });
    }
}

const mapStateToProps = state => {
    return {isTestRunning: state.SpeedTest.isTestRunning, dateOfLastTest: state.SpeedTest.dateOfLastTest, ispLocation: state.SpeedTest.ispLocation}
};

export default connect(mapStateToProps)(AdditionalInfoRow);
