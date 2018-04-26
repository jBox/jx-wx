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
import { ORDER_STATUS } from "../utils/constants";

const CellMore = ({ onClick }) => (
    <Cell access link onClick={onClick}>
        <CellBody>查看详情</CellBody>
        <CellFooter />
    </Cell>
);

const VehicleItem = ({ model, count, withDriver }) => {
    const items = [model.label, `${count} 辆`];
    if (withDriver) {
        items.push("带驾");
    }

    return (<p>{items.join(" / ")}</p>);
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
        let trackTime = new Date(order.createTime).format(formatStr);
        if (order.traces && order.traces.length > 0) {
            trackTime = new Date(
                order.traces[order.traces.length - 1].time
            ).format(formatStr);
        }
        const status = order.service.status || order.status;
        return (
            <Panel>
                <PanelHeader>
                    订单号：{order.id}
                </PanelHeader>
                <PanelBody>
                    <MediaBox type="text">
                        <MediaBoxDescription>
                            <p>{order.contact} | {order.mobile}</p>
                            <p>出发时间：{departureTime}</p>
                            <p>出发地点：{order.departurePlace}</p>
                            {order.vehicles.map((vehicle, i) => (<VehicleItem key={i} {...vehicle} />))}
                        </MediaBoxDescription>
                        <MediaBoxInfo>
                            <MediaBoxInfoMeta>{trackTime}</MediaBoxInfoMeta>
                            <MediaBoxInfoMeta extra>{ORDER_STATUS[status]}</MediaBoxInfoMeta>
                        </MediaBoxInfo>
                    </MediaBox>
                </PanelBody>
                <PanelFooter href="javascript:void(0);">
                    <CellMore onClick={this.handleMoreClick} />
                </PanelFooter>
            </Panel>
        );
    }
}
