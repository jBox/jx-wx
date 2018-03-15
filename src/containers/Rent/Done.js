import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetOrder } from "../../redux/actions/rent";
import { doneSelector } from "../../redux/selectors/rent";
import {
    Preview,
    PreviewFooter,
    PreviewButton,
    CellsTitle
} from "react-weui";
import Page from "../../components/Page";
import OrderPreview from "../../components/OrderPreview";

class Done extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        order: PropTypes.object,
        resetOrder: PropTypes.func
    }

    handleStatusClick = () => {
        const { history } = this.props;
        history.push("/rent/tracking");
    }

    handleRentMore = () => {
        const { resetOrder, history } = this.props;
        if (resetOrder) {
            resetOrder();
            history.replace("/rent");
        }
    }

    handleOrdersClick = () => {
        const { history } = this.props;
        history.replace("/orders");
    }

    render() {
        const { order } = this.props;
        return (
            <Page title="预约租车">
                <OrderPreview order={order} onStatusClick={this.handleStatusClick} />

                <CellsTitle>操作</CellsTitle>
                <Preview>
                    <PreviewFooter>
                        <PreviewButton onClick={this.handleRentMore}>继续预约</PreviewButton>
                        <PreviewButton primary onClick={this.handleOrdersClick}>我的订单</PreviewButton>
                    </PreviewFooter>
                </Preview>
            </Page>
        );
    }
}

export default connect(doneSelector, { resetOrder })(Done);