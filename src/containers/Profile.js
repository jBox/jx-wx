import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import { initialLoad, updateProfile, resetCustomerStatus } from "../redux/actions/customer";
import { profileSelector } from "../redux/selectors/customer";
import {
    ButtonArea,
    Button,
    Toptips,
    Toast
} from "react-weui";
import Page from "../components/Page";
import UserProfile from "../components/UserProfile";

class Profile extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        profile: PropTypes.object,
        status: PropTypes.object,
        ready: PropTypes.bool,
        initialLoad: PropTypes.func,
        updateProfile: PropTypes.func,
        resetCustomerStatus: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            toast: { show: false },
            showToptips: false,
            error: {},
            changed: false
        }

        this.profile = { ...props.profile };
    }

    componentDidMount() {
        const { initialLoad } = this.props;
        if (initialLoad) {
            initialLoad();
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { status } = nextProps;
        if (!isEqual(status, this.props.status)) {
            if (status.state === "initial") {
                this.setState({
                    changed: false,
                    toast: { show: false },
                    showToptips: false,
                    error: {}
                });
            } else if (status.state === "request") {
                if (status.operation === "initial") {
                    this.showToast("loading", "正在加载数据");
                } else if (status.operation === "update") {
                    this.showToast("loading", "正在提交修改");
                }
            } else if (status.state === "success") {
                if (status.operation === "update") {
                    this.showToast("success-no-circle", "修改成功", true);
                } else {
                    this.resetStatus();
                }
            } else if (status.state === "failure") {
                let message = "操作失败，请稍后重试！";
                if (status.operation === "initial") {
                    message = "数据加载失败";
                }

                this.setState({
                    toast: { show: false },
                    showToptips: true,
                    error: { message }
                }, () => this.deferCloseToptips());
            }
        }
    }

    handleChange = (info) => {
        this.profile = info;
        const state = {};
        const changed = !isEqual(info, this.props.profile);

        if (changed !== this.state.changed) {
            state.changed = changed;
        }

        if (this.state.error.message) {
            state.error = {};
        }

        if (!isEmpty(state)) {
            this.setState(state);
        }
    }

    handleSubmit = () => {
        const { updateProfile } = this.props;
        if (this.validate() && updateProfile) {
            updateProfile({ ...this.profile });
        }
    }

    deferCloseToptips = () => {
        this.timeout = setTimeout(() => this.setState({
            toast: { show: false },
            showToptips: false
        }), 2000);
    }

    resetStatus = () => {
        const { resetCustomerStatus } = this.props;
        if (resetCustomerStatus) {
            resetCustomerStatus();
        }
    }

    showToast = (icon, message, deferClose) => {
        this.setState({
            showToptips: false,
            toast: { show: true, icon, message }
        }, () => {
            if (deferClose) {
                this.timeout = setTimeout(this.resetStatus, 1000);
            }
        });
    }

    showError = (key, message) => {
        this.setState({
            toast: { show: false },
            showToptips: true,
            error: { [key]: true, message }
        }, () => this.deferCloseToptips());
    }

    validate = () => {
        const checkMobile = (str) => (/^1\d{10}$/g.test(str));
        const data = this.profile;
        const keys = ["name", "mobile", "address"];
        for (let key of keys) {
            const value = data[key];
            if (key === "name" && !value) {
                return this.showError(key, "请输入姓名");
            }
            if (key === "mobile" && !checkMobile(value)) {
                return this.showError(key, "请填写正确的手机号码");
            }
            if (key === "departureTime" && !value) {
                return this.showError(key, "请输常用地址");
            }
        }

        return true;
    }

    render() {
        const { profile, status, ready } = this.props;
        const { toast, changed } = this.state;

        if (!ready) {
            return (
                <Page title="我的信息">
                    <Toptips type="warn" show={this.state.showToptips}>
                        {this.state.error.message}
                    </Toptips>
                    <Toast icon={toast.icon} show={toast.show}>{toast.message}</Toast>
                </Page>
            );
        }

        return (
            <Page title="我的信息">
                <UserProfile
                    data={profile}
                    error={this.state.error}
                    onChange={this.handleChange}
                />

                <ButtonArea>
                    <Button onClick={this.handleSubmit} disabled={!changed}>修改</Button>
                </ButtonArea>

                <Toptips type="warn" show={this.state.showToptips}>
                    {this.state.error.message}
                </Toptips>
                <Toast icon={toast.icon} show={toast.show}>{toast.message}</Toast>
            </Page>
        );
    }
}

export default connect(profileSelector, {
    initialLoad, updateProfile, resetCustomerStatus
})(Profile);