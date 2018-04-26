import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ButtonArea, Button } from "react-weui";
import Page from "../../components/Page";
import Vehicle from "../../components/Vehicle";
import { updateVehicle } from "../../redux/actions/rent";
import { createVehicleSelector } from "../../redux/selectors/rent";

class Create extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        models: PropTypes.object,
        add: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.vehicle = {
            model: { ...props.models.mvp },
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
                <Vehicle
                    models={this.props.models}
                    onChange={this.handleVehicleChange}
                    onError={this.handleVehicleError}
                    defaultValue={this.vehicle}
                />

                <ButtonArea direction="horizontal">
                    <Button type="default" onClick={this.handleCancelClick}>返回</Button>
                    <Button type="primary" onClick={this.handleSubmitClick} disabled={this.state.error}>添加</Button>
                </ButtonArea>
            </Page>
        );
    }
}

export default connect(createVehicleSelector, { add: updateVehicle })(Create);