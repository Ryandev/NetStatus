
import React from "react";
import StatusRow from "./StatusRow";
import AdditionalInfoRow from "./AdditionalInfoRow";
import styling from "./Container.style";
import { IDashboardStatusItem, IDashboardProps, DashboardStatusValue } from "./Container.if";
import { Status } from "./StatusRow.if";
import { IAdditionalInfoRowProps } from "./AdditionalInfoRow.if";


function Container(props: IDashboardProps): JSX.Element {
    const mapStatusItemToStatusRow = (item: IDashboardStatusItem): JSX.Element => {
        const statusMap: Record<DashboardStatusValue,Status> = {
            [DashboardStatusValue.Good]: Status.Good,
            [DashboardStatusValue.Warning]: Status.Warning,
            [DashboardStatusValue.Bad]: Status.Bad,
            [DashboardStatusValue.Unknown]: Status.Bad,
        };

        return <StatusRow
            key={'StatusRow-'+item.name}
            name={item.name}
            value={item.value}
            status={statusMap[item.status]}
        />
    }
    
    const statusRows = props
        .statusItems
        .map((data) => mapStatusItemToStatusRow(data));

    const infoProps: IAdditionalInfoRowProps = {
        showIconLeft: props.showInfoIcon,
        iconLeft: props.infoIcon,
        iconRight: props.infoIconRight,
        textLeft: props.infoTextLeft,
        textRight: props.infoTextRight,    
    };

    return (
        <div
            key="grid-container"
            style={styling.container.primary}
            className="container-fluid">
            {statusRows}
            <AdditionalInfoRow {...infoProps} />
        </div>
    );
}

export default Container;
