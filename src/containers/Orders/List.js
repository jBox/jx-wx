import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import ordersSelector from "../../redux/selectors/orders";
import Page from "../../components/Page";
import OrderPanel from "../../components/OrderPanel";
import { initialLoad, loadMore } from "../../redux/actions/orders";
import { LoadMore, CellsTitle } from "react-weui";
import InfiniteScroll from "react-infinite-scroller";
import OrderFilter from "../../components/OrderFilter";

class List extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        orders: PropTypes.array,
        filter: PropTypes.string,
        hasMore: PropTypes.bool,
        initialLoad: PropTypes.func,
        loadMore: PropTypes.func
    }

    componentDidMount() {
        const { initialLoad, filter } = this.props;
        if (initialLoad) {
            initialLoad(filter);
        }
    }

    handleOrderClick = (order) => {
        const { history } = this.props;
        history.push(`/orders/${order.id}`);
    }

    handleFilterChange = (filter) => {
        if (this.props.filter !== filter) {
            const { initialLoad } = this.props;
            if (initialLoad) {
                initialLoad(filter);
            }
        }
    }

    handleLoadMore = () => {
        const { loadMore } = this.props;
        if (loadMore) {
            loadMore(this.filter);
        }
    }

    render() {
        const { orders, filter, hasMore } = this.props;
        const loader = (<LoadMore loading key={0}>正在加载</LoadMore>);
        const noData = orders.length === 0;
        const noMore = !hasMore && orders.length !== 0;
        return (
            <Page title="我的订单">
                <OrderFilter value={filter} onChange={this.handleFilterChange} />

                <CellsTitle>订单列表</CellsTitle>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleLoadMore}
                    hasMore={hasMore}
                    loader={loader}
                >
                    {orders.map((order, index) =>
                        (<OrderPanel key={index} order={order} onClick={this.handleOrderClick} />)
                    )}
                </InfiniteScroll>

                {noData && (<LoadMore showLine>暂无数据</LoadMore>)}

                {noMore && (<LoadMore showLine showDot />)}
            </Page>
        );
    }
}

export default connect(ordersSelector, { initialLoad, loadMore })(List);