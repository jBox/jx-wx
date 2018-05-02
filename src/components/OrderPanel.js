import React from "react";
import PropTypes from "prop-types";
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    Cell,
    CellBody,
    CellFooter
} from "react-weui";

const NavCell = ({ status, onClick }) => (
    <Cell access link onClick={onClick}>
        <CellBody>{status}</CellBody>
        <CellFooter>查看详情</CellFooter>
    </Cell>
);

const VehicleItem = ({ model, count, withDriver }) => {
    const items = [model.label, `${count} 辆`];
    if (withDriver) {
        items.push("带驾");
    }

    return (<p>{items.join(" / ")}</p>);
};

const ScheduleItem = ({ licenseNumber, model, driver, mobile, status }) => {
    const StatusText = { start: "已发车", end: "已收车" };
    const items = [licenseNumber, model, driver, mobile];
    return (
        <p>
            {items.join(" | ")}
            {status && (<label style={{ float: "right" }}>{StatusText[status]}</label>)}
        </p>
    );
};

const TitleStyles = {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#605ca8"
};

export default class OrderPanel extends React.Component {

    static propTypes = {
        order: PropTypes.object,
        onClick: PropTypes.func
    }

    handleMoreClick = () => {
        const { onClick, order } = this.props;
        if (onClick) {
            onClick(order);
        }
    }

    render() {
        const { order } = this.props;
        const formatStr = "yyyy-MM-dd hh:mm";
        const departureTime = new Date(order.departureTime).format(formatStr);
        const status = order.status;
        return (
            <Panel>
                <PanelHeader>
                    <span style={TitleStyles}>订单号：{order.id}</span>
                </PanelHeader>
                <PanelBody>
                    <MediaBox type="text">
                        <MediaBoxDescription>
                            <p>出发时间：{departureTime}</p>
                            {order.vehicles.map((vehicle, i) => (<VehicleItem key={i} {...vehicle} />))}
                        </MediaBoxDescription>
                    </MediaBox>
                    {order.schedules.length > 0 && (
                        <MediaBox type="text">
                            <MediaBoxDescription>
                                {order.schedules.map((s, i) => (<ScheduleItem key={i} {...s} />))}
                            </MediaBoxDescription>
                        </MediaBox>
                    )}
                </PanelBody>
                <PanelFooter href="javascript:void(0);">
                    <NavCell status={status.label} onClick={this.handleMoreClick} />
                </PanelFooter>
            </Panel>
        );
    }
}
