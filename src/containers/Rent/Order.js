import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEqual from "lodash/isEqual";
import { submitOrder, updateOrder } from "../../redux/actions/rent";
import rentSelector from "../../redux/selectors/rent";
import {
    ButtonArea,
    Button,
    Toptips,
    Toast
} from "react-weui";
import Page from "../../components/Page";
import OrderDetails from "../../components/OrderDetails";

class Order extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        order: PropTypes.object,
        status: PropTypes.string,
        submitOrder: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            showToast: false,
            showLoading: props.status === "submit",
            showToptips: false,
            error: {}
        }

        const { vehicles, ...baseInfo } = props.order;
        this.baseInfo = baseInfo;
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { order, status } = nextProps;
        if (status !== this.props.status) {
            if (status === "submit") {
                const showLoading = true;
                if (this.state.showLoading !== showLoading) {
                    this.setState({ showLoading });
                }
            } else if (status === "success") {
                this.forward(order);
            }
        }
    }

    handleEditVehicle = (item) => {
        const { history, updateOrder } = this.props;
        if (updateOrder) {
            updateOrder({ ...this.baseInfo });
        }
        history.push(`/order/vehicles/${item.id}`);
    }

    handleCreateVehicle = () => {
        const { history, updateOrder } = this.props;
        if (updateOrder) {
            updateOrder({ ...this.baseInfo });
        }
        history.push("/order/vehicles");
    }

    handleChange = (info) => {
        this.baseInfo = info;
        if (this.state.error.message) {
            this.setState({ error: {} });
        }
    }

    handleSubmit = () => {
        const { submitOrder, order } = this.props;
        if (this.validate() && submitOrder) {
            submitOrder({ ...order, ...this.baseInfo });
        }
    }

    forward = (order) => {
        const { history } = this.props;
        history.replace(`/order/done`);
    }

    deferCloseToptips = () => {
        this.timeout = setTimeout(() => this.setState({ showToptips: false }), 2000);
    }

    showError = (key, message) => {
        this.setState({
            showToptips: true,
            error: { [key]: true, message }
        }, () => this.deferCloseToptips());
    }

    validate = () => {
        const { order } = this.props;
        const checkMobile = (str) => (/^1\d{10}$/g.test(str));
        const data = this.baseInfo;
        const keys = ["contact", "mobile", "departureTime", "departurePlace", "destination", "duration"];
        for (let key of keys) {
            const value = data[key];
            if (key === "contact" && !value) {
                return this.showError(key, "请输入联系人");
            }
            if (key === "mobile" && !checkMobile(value)) {
                return this.showError(key, "请填写正确的手机号码");
            }
            if (key === "departureTime" && !value) {
                return this.showError(key, "请输入出发时间");
            }
            if (key === "departurePlace" && !value) {
                return this.showError(key, "请输入出发地点");
            }
            if (key === "destination" && !value) {
                return this.showError(key, "请输入目的地");
            }
            if (key === "duration" && value <= 0) {
                return this.showError(key, "请输入正确的租车天数");
            }
        }

        if (order.vehicles.length === 0) {
            return this.showError("vehicle", "请添加车辆");
        }

        return true;
    }

    render() {
        const { order } = this.props;
        return (
            <Page title="预约租车">
                <OrderDetails data={order} error={this.state.error}
                    onChange={this.handleChange}
                    onEditVehicle={this.handleEditVehicle}
                    onCreateVehicle={this.handleCreateVehicle}
                />

                <ButtonArea>
                    <Button onClick={this.handleSubmit}>提交</Button>
                </ButtonArea>

                <Toptips type="warn" show={this.state.showToptips}>
                    {this.state.error.message}
                </Toptips>
                <Toast icon="success-no-circle" show={this.state.showToast}>提交成功</Toast>
                <Toast icon="loading" show={this.state.showLoading}>正在提交</Toast>
            </Page>
        );
    }
}

export default connect(rentSelector, { submitOrder, updateOrder })(Order);