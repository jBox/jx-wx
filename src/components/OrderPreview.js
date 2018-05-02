import React, { Component, Fragment } from "react";
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

const VehicleDetail = ({ vehicle }) => {
    const model = vehicle.model.label;
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
    const departureTime = order.departureTime.toDateTime();
    const createTime = order.createTime.toDateTime();
    return (
        <PreviewBody>
            <PreviewItem label="联系人" value={order.contact} />
            <PreviewItem label="联系电话" value={order.mobile} />
            <PreviewItem label="出发时间" value={departureTime} />
            <PreviewItem label="出发地点" value={order.departurePlace} />
            <PreviewItem label="目的地" value={order.destination} />
            <PreviewItem label="租车天数" value={`${order.duration}`} />
            {order.vehicles.map((v, index) => (<VehicleDetail key={index} vehicle={v} />))}
            {order.notes && (<PreviewItem label="备注" value={order.notes} />)}
            <PreviewItem label="下单时间" value={createTime} />
        </PreviewBody>
    );
};

const OrderSchedules = ({ schedules }) => {
    if (schedules.length === 0) {
        return null;
    }

    const StatusText = { start: "已发车", end: "已收车" };
    const scheduleInfo = ({ licenseNumber, model, driver, mobile }) => {
        const items = [licenseNumber, model, driver, mobile];
        return items.join(" | ");
    };

    return (
        <Fragment>
            <CellsTitle>车辆安排</CellsTitle>
            <Cells>
                {schedules.map((item, index) => (
                    <Cell key={index} style={{ fontSize: "0.8em" }}>
                        <CellBody>{scheduleInfo(item)}</CellBody>
                        {item.status && (
                            <CellFooter>
                                {StatusText[item.status]}
                            </CellFooter>
                        )}
                    </Cell>
                ))}
            </Cells>
        </Fragment>
    );
}

export default class OrderPreview extends Component {
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

        return (
            <Fragment>
                <CellsTitle>订单详情</CellsTitle>
                <Preview>
                    <PreviewHeader>
                        <PreviewItem label="订单号" value={order.id} />
                    </PreviewHeader>
                    <PreviewDetails order={order} />
                </Preview>

                <OrderSchedules schedules={order.schedules} />

                <CellsTitle>订单状态</CellsTitle>
                <Cells>
                    <Cell access onClick={this.handleStatusClick}>
                        <CellBody>状态</CellBody>
                        <CellFooter>
                            {order.status.label}
                        </CellFooter>
                    </Cell>
                </Cells>
            </Fragment>
        );
    }
}