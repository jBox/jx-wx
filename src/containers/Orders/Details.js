import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import { orderSelector } from "../../redux/selectors/orders";
import {
    Preview,
    PreviewFooter,
    PreviewButton,
    CellsTitle,
    Dialog,
    Toptips,
    Toast
} from "react-weui";
import Page from "../../components/Page";
import OrderPreview from "../../components/OrderPreview";
import { cancelOrder, deleteOrder, resetOrderStatus } from "../../redux/actions/orders";

class Details extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        order: PropTypes.object,
        status: PropTypes.object,
        cancelOrder: PropTypes.func
    }

    componentWillUnmount() {
        this.clearTimeout();
    }

    componentWillReceiveProps(nextProps) {
        const { status } = nextProps;
        if (!isEqual(status, this.props.status)) {
            if (status.state === "initial") {
                this.setState({
                    toast: { show: false },
                    toptips: { show: false }
                });
            } else if (status.state === "request") {
                this.showToast("loading", "数据加载中");
            } else if (status.state === "success") {
                if (status.operation === "delete") {
                    this.showToast("success", "已删除订单", this.handleBack);
                } else {
                    this.showToast("success", "已取消订单");
                }
            } else if (status.state === "failure") {
                this.showToptips("操作失败，请稍后重试！")
            }
        }
    }

    clearTimeout = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    resetOrderStatus = () => {
        const { resetOrderStatus, order } = this.props;
        if (resetOrderStatus) {
            resetOrderStatus(order);
        }
    }

    showToast = (type, message, cb) => {
        this.clearTimeout();
        const types = { success: "success-no-circle", loading: "loading" };
        this.setState({
            toptips: { show: false },
            toast: { show: true, icon: types[type], message }
        }, () => {
            if (type === "success") {
                const timeoutFn = cb ? cb : this.resetOrderStatus;
                this.timeout = setTimeout(timeoutFn, 1000);
            }
        });
    }

    showToptips = (message) => {
        this.clearTimeout();
        this.setState({
            toast: { show: false },
            toptips: { show: true, message }
        }, () => this.timeout = setTimeout(this.resetOrderStatus, 2000));
    }

    state = {
        dialog: { show: false },
        toast: { show: false },
        toptips: { show: false }
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
        const { dialog, toast, toptips } = this.state;
        const orderService = order.service;
        const cancelable = orderService.status !== "cancelling" && orderService.status !== "cancelled";
        const deletable = !order.deleted && orderService.status === "cancelled";
        const cancelButton = order.status === "submitted" ? "取消订单" : "申请取消订单";
        return (
            <Page title="我的订单">
                <OrderPreview order={order} onStatusClick={this.handleStatusClick} />

                <CellsTitle></CellsTitle>
                <Preview>
                    <PreviewFooter>
                        {cancelable && (<PreviewButton onClick={this.handleCancel}>{cancelButton}</PreviewButton>)}
                        {deletable && (<PreviewButton onClick={this.handleDelete}>删除订单</PreviewButton>)}
                        <PreviewButton primary onClick={this.handleBack}>确认</PreviewButton>
                    </PreviewFooter>
                </Preview>

                <Dialog type="ios" title={dialog.title} buttons={dialog.buttons} show={dialog.show}>
                    {dialog.message}
                </Dialog>

                <Toptips type="warn" show={toptips.show}>{toptips.message}</Toptips>

                <Toast icon={toast.icon} show={toast.show}>{toast.message}</Toast>
            </Page>
        );
    }
}

export default connect(orderSelector, { cancelOrder, deleteOrder, resetOrderStatus })(Details);