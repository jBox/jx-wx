import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
    CellsTitle,
    Form,
    FormCell,
    CellHeader,
    CellBody,
    Select,
    Label
} from "react-weui";

export default class OrderFilter extends Component {
    static defaultProps = {
        value: "submitted"
    }

    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func
    }

    options = [
        {
            value: "all",
            label: "全部订单"
        },
        {
            value: "submitted",
            label: "待处理"
        },
        {
            value: "completed",
            label: "已完成"
        },
        {
            value: "cancelled",
            label: "已取消"
        }
    ];

    handleChange = (e) => {
        const { value } = e.target;
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    }

    render() {
        return (
            <Fragment>
                <CellsTitle>筛选条件</CellsTitle>
                <Form>
                    <FormCell select selectPos="after">
                        <CellHeader>
                            <Label>状态</Label>
                        </CellHeader>
                        <CellBody>
                            <Select defaultValue={this.props.value} data={this.options} onChange={this.handleChange} />
                        </CellBody>
                    </FormCell>
                </Form>
            </Fragment>
        );
    }
}