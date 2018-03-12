import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
        const { history } = this.props;
        history.push(`/orders/${order.id}/tracking`);
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
                        <PreviewButton>取消订单</PreviewButton>
                        <PreviewButton primary onClick={this.handleBack}>确认</PreviewButton>
                    </PreviewFooter>
                </Preview>
            </Page>
        );
    }
}

export default connect(orderSelector)(Details);