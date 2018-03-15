import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import ordersSelector from "../../redux/selectors/orders";
import Page from "../../components/Page";
import OrderPanel from "../../components/OrderPanel";
import { initialLoad, loadMore } from "../../redux/actions/orders";
import { LoadMore } from "react-weui";
import InfiniteScroll from "react-infinite-scroller";

class List extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        orders: PropTypes.array,
        hasMore: PropTypes.bool,
        initialLoad: PropTypes.func,
        loadMore: PropTypes.func
    }

    componentDidMount() {
        const { initialLoad } = this.props;
        if (initialLoad) {
            initialLoad();
        }
    }

    handleOrderClick = (order) => {
        const { history } = this.props;
        history.push(`/orders/${order.id}`);
    }

    render() {
        const { orders, loadMore, hasMore } = this.props;
        const loader = (<LoadMore loading key={0}>正在加载</LoadMore>);
        return (
            <Page title="我的订单">
                {orders.length === 0 && (<LoadMore showLine>暂无数据</LoadMore>)}

                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    loader={loader}
                >
                    {orders.map((order, index) =>
                        (<OrderPanel key={index} order={order} onClick={this.handleOrderClick} />)
                    )}
                </InfiniteScroll>

                {!hasMore && (<LoadMore showLine showDot />)}
            </Page>
        );
    }
}

export default connect(ordersSelector, { initialLoad, loadMore })(List);