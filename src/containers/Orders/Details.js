import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { orderSelector } from "../../redux/selectors/orders";
import {
    Preview,
    PreviewFooter,
    PreviewButton,
    CellsTitle,
    Dialog
} from "react-weui";
import Page from "../../components/Page";
import OrderPreview from "../../components/OrderPreview";
import { cancelOrder, deleteOrder } from "../../redux/actions/orders";

class Details extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        order: PropTypes.object,
        status: PropTypes.object,
        cancelOrder: PropTypes.func
    }

    state = {
        dialog: { show: false }
    }

    handleStatusClick = (order) => {
        const { history } = this.props;
        history.push(`/orders/${order.id}/tracking`);
    }

    closeDialog = () => {
        this.setState({ dialog: { show: false } });
    }

    confirnCancelOrder = () => {
        this.setState({ dialog: { show: false } });
        const { cancelOrder, order } = this.props;
        if (cancelOrder) {
            cancelOrder(order);
        }
    }

    confirnDeleteOrder = () => {
        this.setState({ dialog: { show: false } });
        const { deleteOrder, order } = this.props;
        if (deleteOrder) {
            deleteOrder(order);
        }
    }

    handleCancel = () => {
        this.setState({
            dialog: {
                show: true,
                title: "取消订单",
                message: "您正在取消您的订单，确定吗？",
                buttons: [
                    {
                        type: "default",
                        label: "放弃",
                        onClick: this.closeDialog
                    },
                    {
                        type: "primary",
                        label: "确定",
                        onClick: this.confirnCancelOrder
                    }
                ]
            }
        });
    }

    handleDelete = () => {
        this.setState({
            dialog: {
                show: true,
                title: "删除订单",
                message: "您正在删除您的订单，订单删除之后将无法恢复，确定吗？",
                buttons: [
                    {
                        type: "default",
                        label: "放弃",
                        onClick: this.closeDialog
                    },
                    {
                        type: "primary",
                        label: "确定",
                        onClick: this.confirnDeleteOrder
                    }
                ]
            }
        });
    }

    handleBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        const { order } = this.props;
        const { dialog } = this.state;
        const orderStatus = order.status;
        const cancelable = orderStatus !== "canceling" && orderStatus !== "cancelled";
        const deletable = orderStatus === "cancelled";
        return (
            <Page title="我的订单">
                <OrderPreview order={order} onStatusClick={this.handleStatusClick} />

                <CellsTitle>操作</CellsTitle>
                <Preview>
                    <PreviewFooter>
                        {cancelable && (<PreviewButton onClick={this.handleCancel}>取消订单</PreviewButton>)}
                        {deletable && (<PreviewButton onClick={this.handleDelete}>删除订单</PreviewButton>)}
                        <PreviewButton primary onClick={this.handleBack}>确认</PreviewButton>
                    </PreviewFooter>
                </Preview>

                <Dialog type="ios" title={dialog.title} buttons={dialog.buttons} show={dialog.show}>
                    {dialog.message}
                </Dialog>
            </Page>
        );
    }
}

export default connect(orderSelector, { cancelOrder, deleteOrder })(Details);