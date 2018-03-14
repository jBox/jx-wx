import React from "react";
import PropTypes from "prop-types";
import {
    Preview,
    PreviewHeader,
    PreviewFooter,
    PreviewBody,
    PreviewItem,
    CellsTitle
} from "react-weui";

const ORDER_STATUS = {
    "submit": "已经提交"
}

const Trace = ({ time, state }) => (<PreviewItem label={new Date(time).format("yyyy-MM-dd hh:mm")} value={state} />);

export default class OrderStatus extends React.Component {
    static propTypes = {
        status: PropTypes.string,
        traces: PropTypes.array
    }

    render() {
        const { status, traces } = this.props;
        return [
            (<CellsTitle key="statuslabel">订单状态</CellsTitle>),
            (<Preview key="status">
                <PreviewHeader>
                    <PreviewItem label="状态" value={ORDER_STATUS[status]} />
                </PreviewHeader>
                <PreviewBody>
                    {traces.map((trace, index) =>
                        (<Trace key={index} {...trace} />)
                    )}
                </PreviewBody>
            </Preview>)
        ];
    }
}