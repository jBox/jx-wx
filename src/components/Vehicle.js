import React from "react";
import PropTypes from "prop-types";
import {
    CellsTitle,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Input,
    Label,
    TextArea,
    Switch,
    Select,
    Icon
} from "react-weui";

export default class Vehicle extends React.Component {

    static defaultProps = {
        defaultValue: {}
    }

    static propTypes = {
        models: PropTypes.object,
        defaultValue: PropTypes.object,
        onChange: PropTypes.func,
        onError: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.defaultValue = {
            model: "mvp",
            count: 1,
            withDriver: true,
            ...props.defaultValue
        };

        this.form = { ...this.defaultValue };

        this.state = {
            error: false
        }
    }

    handleInputChange = (e) => {
        const { onChange, onError, models } = this.props;
        const target = e.target;
        const { name } = target;
        let value = target.value;
        if (target.hasOwnProperty("checked")) {
            value = target.checked;
        }

        if (name === "count") {
            value = Number(value);
            const error = value <= 0;
            if (this.state.error !== error) {
                this.setState({ error }, () => {
                    if (this.state.error && onError) {
                        onError();
                    }
                });
            }

            if (error) {
                return error;
            }
        }

        if (name === "model") {
            value = { ...models[value] };
        }

        this.form[name] = value;
        if (onChange) {
            onChange({ ...this.form });
        }

        return this.form;
    }

    render() {
        const { models } = this.props;
        const defaultValue = this.defaultValue;
        return [
            (<CellsTitle key="formlabel">车辆信息</CellsTitle>),
            (<Form key="form">
                <FormCell select selectPos="after">
                    <CellHeader>
                        <Label>车型</Label>
                    </CellHeader>
                    <CellBody>
                        <Select defaultValue={defaultValue.model.id} name="model" onChange={this.handleInputChange}>
                            {Object.keys(models).map((model) => (
                                <option key={model} value={model}>{models[model].label}</option>
                            ))}
                        </Select>
                    </CellBody>
                </FormCell>
                <FormCell warn={this.state.error}>
                    <CellHeader>
                        <Label>数量</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="number" placeholder="租车数量" name="count" defaultValue={defaultValue.count.toString()} onChange={this.handleInputChange} />
                    </CellBody>
                    {this.state.error && (<CellFooter>
                        <Icon value="warn" />
                    </CellFooter>)}
                </FormCell>
                <FormCell switch>
                    <CellBody>是否带驾</CellBody>
                    <CellFooter>
                        <Switch defaultChecked={defaultValue.withDriver} name="withDriver" onChange={this.handleInputChange} />
                    </CellFooter>
                </FormCell>
            </Form>),

            (<CellsTitle key="noteslabel">备注</CellsTitle>),
            (<Form key="notes">
                <FormCell>
                    <CellBody>
                        <TextArea placeholder="其他要求" rows="2" maxLength={100} name="notes" defaultValue={defaultValue.notes} onChange={this.handleInputChange} />
                    </CellBody>
                </FormCell>
            </Form>)
        ];
    }
}