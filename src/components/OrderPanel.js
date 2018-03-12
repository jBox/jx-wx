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

const MODEL_LABELS = {
    "mvp": "商务车",
    "sedan": "轿车"
};

const ORDER_STATUS = {
    "submit": "已经提交"
}

const CellMore = ({ onClick }) => (
    <Cell access link onClick={onClick}>
        <CellBody>查看详情</CellBody>
        <CellFooter />
    </Cell>
);

const VehicleItem = ({ model, count, withDriver }) => {
    const items = [MODEL_LABELS[model], `${count} 辆`];
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
        return (
            <Panel>
                <PanelHeader>
                    订单号：{order.id}
                </PanelHeader>
                <PanelBody>
                    <MediaBox type="text">
                        <MediaBoxDescription>
                            <p>{order.name} | {order.mobile}</p>
                            <p>出发时间：{order.departureTime}</p>
                            <p>出发地点：{order.departurePlace}</p>
                            {order.vehicles.map((vehicle, i) => (<VehicleItem key={i} {...vehicle} />))}
                        </MediaBoxDescription>
                        <MediaBoxInfo>
                            <MediaBoxInfoMeta>{order.createTime}</MediaBoxInfoMeta>
                            <MediaBoxInfoMeta extra>{ORDER_STATUS[order.status]}</MediaBoxInfoMeta>
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
