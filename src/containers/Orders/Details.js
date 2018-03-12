import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import { orderSelector } from "../../redux/selectors/orders";
import {
    Preview,
    PreviewFooter,
    PreviewButton,
    CellsTitle
} from "react-weui";
import Page from "../../components/Page";
import OrderPreview from "../../components/OrderPreview";

class Details extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        order: PropTypes.object
    }

    handleStatusClick = (order) => {
        console.log(order);
    }

    handleBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        const { order } = this.props;
        return (
            <Page title="我的订单">
                <OrderPreview order={order} onStatusClick={this.handleStatusClick} />

                <CellsTitle>操作</CellsTitle>
                <Preview>
                    <PreviewFooter>
                        <PreviewButton onClick={this.handleBack}>返回</PreviewButton>
                        <PreviewButton primary>删除</PreviewButton>
                        <PreviewButton primary>修改</PreviewButton>
                    </PreviewFooter>
                </Preview>
            </Page>
        );
    }
}

export default connect(orderSelector)(Details);