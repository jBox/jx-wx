import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ButtonArea, Button } from "react-weui";
import Page from "../../components/Page";
import Vehicle from "../../components/Vehicle";
import { updateVehicle } from "../../redux/actions/rent";

class Create extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        add: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.vehicle = {
            model: "mvp",
            count: 1,
            withDriver: true
        };

        this.state = {
            error: false
        };
    }

    goBack = () => {
        const { history } = this.props;
        if (history) {
            history.goBack();
        }
    }

    handleCancelClick = () => {
        this.goBack();
    }

    handleSubmitClick = () => {
        const { add } = this.props;
        if (add) {
            add(this.vehicle);
        }
        this.goBack();
    }

    handleVehicleChange = (vehicle) => {
        this.vehicle = vehicle;
        if (this.state.error) {
            this.setState({ error: false });
        }
    }

    handleVehicleError = () => {
        if (!this.state.error) {
            this.setState({ error: true });
        }
    }

    render() {
        return (
            <Page title="约车下单 - 添加车辆">
                <Vehicle onChange={this.handleVehicleChange} onError={this.handleVehicleError} defaultValue={this.vehicle} />

                <ButtonArea direction="horizontal">
                    <Button type="warn" onClick={this.handleCancelClick}>放弃</Button>
                    <Button onClick={this.handleSubmitClick} disabled={this.state.error}>添加</Button>
                </ButtonArea>
            </Page>
        );
    }
}

export default connect(null, { add: updateVehicle })(Create);