import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import {
    CellsTitle,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label
} from "react-weui";
import { MODEL_LABELS } from "../utils/constants";


const RequiredCell = ({ error, label, children }) => (
    <FormCell warn={error}>
        <CellHeader><Label>{label}</Label></CellHeader>
        <CellBody>{children}</CellBody>
        {error && (<CellFooter><Icon value="warn" /></CellFooter>)}
    </FormCell>
);

export default class UserProfile extends React.Component {
    static defaultProps = {
        data: {},
        error: {}
    }

    static propTypes = {
        data: PropTypes.object,
        error: PropTypes.object,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            error: props.error
        };

        this.form = {
            ...props.data
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.error, this.props.error)) {
            this.setState({ error: nextProps.error });
        }
    }

    handleInputChange = (e) => {
        const target = e.target;
        const { name, type } = target;
        let value = target.value;
        switch (type) {
            case "number":
                value = Number(value);
                break;
            case "checkbox":
            case "radio":
                value = target.checked;
                break;
        }

        this.form[name] = value;
        const { onChange } = this.props;
        if (onChange) {
            onChange({ ...this.form });
        }
    }

    render() {
        const { error } = this.state;
        const { data } = this.props;
        return [
            (<CellsTitle key="contactinfo">基本信息</CellsTitle>),
            (<Form key="contact">
                <RequiredCell error={error.name} label="姓名">
                    <Input type="text" placeholder="姓名" defaultValue={data.name} name="name" onChange={this.handleInputChange} />
                </RequiredCell>
                <RequiredCell error={error.mobile} label="手机号码">
                    <Input type="tel" placeholder="手机号码" defaultValue={data.mobile} name="mobile" onChange={this.handleInputChange} />
                </RequiredCell>
                <RequiredCell error={error.address} label="常用地址">
                    <Input type="text" defaultValue={data.address} placeholder="常用地址" name="address" onChange={this.handleInputChange} />
                </RequiredCell>
            </Form>)
        ];
    }
}