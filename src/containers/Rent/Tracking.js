import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { trackingSelector } from "../../redux/selectors/rent";
import { Preview, PreviewFooter, PreviewButton } from "react-weui";
import Page from "../../components/Page";
import OrderStatus from "../../components/OrderStatus";

class Tracking extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        order: PropTypes.object
    }

    handleClick = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        const { order: { status, traces } } = this.props;
        return (
            <Page title="预约租车">
                <OrderStatus status={status} traces={traces} />
                <Preview>
                    <PreviewFooter>
                        <PreviewButton primary onClick={this.handleClick}>确认</PreviewButton>
                    </PreviewFooter>
                </Preview>
            </Page>
        );
    }
}

export default connect(trackingSelector)(Tracking);