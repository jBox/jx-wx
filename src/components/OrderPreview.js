import React from "react";
import PropTypes from "prop-types";
import {
    Preview,
    PreviewHeader,
    PreviewFooter,
    PreviewBody,
    PreviewItem,
    PreviewButton,
    CellsTitle,
    Cells,
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

const VehicleDetail = ({ vehicle }) => {
    const model = MODEL_LABELS[vehicle.model];
    const values = [`${vehicle.count} 辆`];
    if (vehicle.withDriver) {
        values.push("带驾");
    }
    if (vehicle.notes) {
        values.push(vehicle.notes);
    }

    return (<PreviewItem label={model} value={values.join(" / ")} />);
};

const PreviewDetails = ({ order }) => {
    const departureTime = new Date(order.departureTime).format("yyyy-MM-dd hh:mm");
    const createTime = new Date(order.createTime).format("yyyy-MM-dd hh:mm");
    return (
        <PreviewBody>
            <PreviewItem label="联系人" value={order.name} />
            <PreviewItem label="联系电话" value={order.mobile} />
            <PreviewItem label="出发时间" value={departureTime} />
            <PreviewItem label="出发地点" value={order.departurePlace} />
            <PreviewItem label="目的地" value={order.destination} />
            <PreviewItem label="租车天数" value={order.duration} />
            {order.vehicles.map((v, index) => (<VehicleDetail key={index} vehicle={v} />))}
            {order.notes && (<PreviewItem label="备注" value={order.notes} />)}
            <PreviewItem label="下单时间" value={createTime} />
        </PreviewBody>
    );
};

export default class OrderPreview extends React.Component {
    static propTypes = {
        order: PropTypes.object,
        onStatusClick: PropTypes.func
    }

    handleStatusClick = () => {
        const { onStatusClick, order } = this.props;
        if (onStatusClick) {
            onStatusClick(order);
        }
    }

    render() {
        const { order } = this.props;
        return [
            (<CellsTitle key="orderinfolabel">订单详情</CellsTitle>),
            (<Preview key="orderinfo">
                <PreviewHeader>
                    <PreviewItem label="订单号" value={order.id} />
                </PreviewHeader>
                <PreviewDetails order={order} />
            </Preview>),

            (<CellsTitle key="orderstatuslabel">订单状态</CellsTitle>),
            (<Cells key="orderstatus">
                <Cell access onClick={this.handleStatusClick}>
                    <CellBody>
                        状态
                    </CellBody>
                    <CellFooter>
                        {ORDER_STATUS[order.status]}
                    </CellFooter>
                </Cell>
            </Cells>)
        ];
    }
}