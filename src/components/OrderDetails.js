import React, { Component, Fragment } from "react";
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
    Label,
    TextArea
} from "react-weui";

const clickHander = (obj, onClick) => () => onClick(obj);

const localDepartureTime = (departureTime) => {
    const time = new Date(departureTime);
    return time.format("yyyy-MM-ddThh:mm");
};

const VehicleItem = ({ id, model, count, withDriver, onClick }) => (
    <Cell access onClick={clickHander({ id, model, count, withDriver }, onClick)}>
        <CellBody>
            {model.label} / {count} 辆{withDriver && " / 带驾"}
        </CellBody>
        <CellFooter>详细信息</CellFooter>
    </Cell >
);

const RequiredCell = ({ error, label, children }) => (
    <FormCell warn={error}>
        <CellHeader><Label>{label}</Label></CellHeader>
        <CellBody>{children}</CellBody>
        {error && (<CellFooter><Icon value="warn" /></CellFooter>)}
    </FormCell>
);

const OptionalCell = ({ label, children }) => (
    <FormCell>
        {label && (<CellHeader><Label>{label}</Label></CellHeader>)}
        <CellBody>{children}</CellBody>
    </FormCell>
);

export default class OrderDetails extends Component {
    static defaultProps = {
        data: {},
        error: {}
    }

    static propTypes = {
        data: PropTypes.object,
        error: PropTypes.object,
        onChange: PropTypes.func,
        onEditVehicle: PropTypes.func,
        onCreateVehicle: PropTypes.func
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

    handleEditVehicle = (item) => {
        const { onEditVehicle } = this.props;
        if (onEditVehicle) {
            onEditVehicle(item);
        }
    }

    handleAddVehicle = () => {
        const { onCreateVehicle } = this.props;
        if (onCreateVehicle) {
            onCreateVehicle();
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
            case "departureTime":
                value = new Date(value).toISOString();
        }

        this.form[name] = value;
        const { onChange } = this.props;
        if (onChange) {
            onChange({ ...this.form });
        }
    }

    render() {
        const { error } = this.state;
        const { data: { vehicles, ...baseInfo } } = this.props;

        const departureTime = localDepartureTime(baseInfo.departureTime);
        const now = new Date();
        now.setMinutes(0);
        now.setHours(now.getHours() + 3);
        const departureMinTime = now.format("yyyy-MM-ddThh:mm");
        now.setDate(now.getDate() + 90);
        const departureMaxTime = now.format("yyyy-MM-ddThh:mm");

        return (
            <Fragment>
                <CellsTitle>联系信息</CellsTitle>
                <Form>
                    <RequiredCell error={error.contact} label="联系人">
                        <Input type="text" placeholder="姓名" defaultValue={baseInfo.contact} name="contact" onChange={this.handleInputChange} />
                    </RequiredCell>
                    <RequiredCell error={error.mobile} label="联系电话">
                        <Input type="tel" placeholder="手机号码" defaultValue={baseInfo.mobile} name="mobile" onChange={this.handleInputChange} />
                    </RequiredCell>
                    <RequiredCell error={error.departureTime} label="出发时间">
                        <Input type="datetime-local" min={departureMinTime} max={departureMaxTime}
                            defaultValue={departureTime} placeholder="出发时间"
                            name="departureTime"
                            onChange={this.handleInputChange} />
                    </RequiredCell>
                    <RequiredCell error={error.departurePlace} label="出发地点">
                        <Input type="text" defaultValue={baseInfo.departurePlace} placeholder="出发地点" name="departurePlace" onChange={this.handleInputChange} />
                    </RequiredCell>
                    <RequiredCell error={error.destination} label="目的地">
                        <Input type="text" defaultValue={baseInfo.destination} placeholder="目的地" name="destination" onChange={this.handleInputChange} />
                    </RequiredCell>
                    <RequiredCell error={error.duration} label="租车天数">
                        <Input type="number" defaultValue={baseInfo.duration.toString()} placeholder="租车天数" name="duration" onChange={this.handleInputChange} />
                    </RequiredCell>
                </Form>

                <CellsTitle>车辆信息</CellsTitle>
                <Cells>
                    {vehicles.map((v) => (<VehicleItem key={v.id} {...v} onClick={this.handleEditVehicle} />))}
                    <Cell access onClick={this.handleAddVehicle}>
                        <CellBody>
                            添加车辆
                        </CellBody>
                        <CellFooter>
                            添加车辆
                        </CellFooter>
                    </Cell>
                </Cells>

                <CellsTitle>备注</CellsTitle>
                <Form>
                    <OptionalCell>
                        <TextArea placeholder="其他要求" rows="2" maxLength={200} defaultValue={baseInfo.notes} name="notes" onChange={this.handleInputChange} />
                    </OptionalCell>
                </Form>
            </Fragment>
        );
    }
}