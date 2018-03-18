import React from "react";
import PropTypes from "prop-types";
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription
} from "react-weui";
import Page from "../components/Page";

export default class App extends React.Component {

    static propTypes = {
        history: PropTypes.object
    }

    navigateTo = (path) => {
        return () => {
            const { history } = this.props;
            if (history && path) {
                history.push(path);
            }
        }
    }

    render() {
        return (
            <Page title="首页">
                <div style={{ padding: "20px" }}>
                    <Panel>
                        <PanelBody>
                            <MediaBox type="appmsg" href="javascript:void(0);" onClick={this.navigateTo("/order")}>
                                <MediaBoxHeader>
                                    <img src="/static/img/order.png" width="60px" height="60px" />
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>预约租车</MediaBoxTitle>
                                    <MediaBoxDescription>

                                    </MediaBoxDescription>
                                </MediaBoxBody>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                    <Panel>
                        <PanelBody>
                            <MediaBox type="appmsg" href="javascript:void(0);" onClick={this.navigateTo("/orders")}>
                                <MediaBoxHeader>
                                    <img src="/static/img/list.png" width="60px" height="60px" />
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>我的订单</MediaBoxTitle>
                                    <MediaBoxDescription>

                                    </MediaBoxDescription>
                                </MediaBoxBody>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                    <Panel>
                        <PanelBody>
                            <MediaBox type="appmsg" href="javascript:void(0);" onClick={this.navigateTo("/profile")}>
                                <MediaBoxHeader>
                                    <img src="/static/img/profile.png" width="60px" height="60px" />
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>我的信息</MediaBoxTitle>
                                    <MediaBoxDescription>

                                    </MediaBoxDescription>
                                </MediaBoxBody>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                </div>
            </Page>
        );
    }
};
