import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import ordersSelector from "../../redux/selectors/orders";
import Page from "../../components/Page";
import OrderPanel from "../../components/OrderPanel";

class List extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        orders: PropTypes.array
    }

    handleOrderClick = (order) => {
        const { history } = this.props;
        history.push(`/orders/${order.id}`);
    }

    render() {
        const { orders } = this.props;
        return (
            <Page title="我的订单">
                {orders.map((order, index) =>
                    (<OrderPanel key={index} order={order} onClick={this.handleOrderClick} />)
                )}
            </Page>
        );
    }
}

export default connect(ordersSelector)(List);