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

import { ORDER_STATUS } from "../utils/constants";

const Trace = ({ time, state }) => (<PreviewItem label={new Date(time).format("yyyy-MM-dd hh:mm")} value={state} />);

export default class OrderStatus extends React.Component {
    static propTypes = {
        status: PropTypes.string,
        traces: PropTypes.array
    }

    render() {
        const { status, traces } = this.props;
        const items = [...traces].reverse();
        return [
            (<CellsTitle key="statuslabel">订单状态</CellsTitle>),
            (<Preview key="status">
                <PreviewHeader>
                    <PreviewItem label="状态" value={ORDER_STATUS[status]} />
                </PreviewHeader>
                <PreviewBody>
                    {items.map((trace, index) =>
                        (<Trace key={index} {...trace} />)
                    )}
                </PreviewBody>
            </Preview>)
        ];
    }
}