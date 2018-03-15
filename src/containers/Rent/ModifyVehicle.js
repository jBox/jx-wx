import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ButtonArea, Button } from "react-weui";
import isEqual from "lodash/isEqual";
import Page from "../../components/Page";
import Vehicle from "../../components/Vehicle";
import { updateVehicle } from "../../redux/actions/rent";
import { modifySelector } from "../../redux/selectors/rent";

class Modify extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        vehicle: PropTypes.object.isRequired,
        modify: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.vehicle = {
            model: "mvp",
            count: 1,
            withDriver: true,
            ...props.vehicle
        };

        this.state = {
            error: false,
            changed: false
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
        const { vehicle, modify } = this.props;
        if (modify) {
            modify({ ...this.vehicle, id: vehicle.id });
        }
        this.goBack();
    }

    handleDeleteClick = (item) => {
        const { vehicle, modify } = this.props;
        if (modify) {
            modify({ id: vehicle.id, delete: true });
        }
        this.goBack();
    }

    handleVehicleChange = (item) => {
        this.vehicle = item;
        const state = {};
        const { vehicle } = this.props;
        const changed = !isEqual(vehicle, item);
        if (this.state.changed !== changed) {
            state.changed = changed;
        }
        if (this.state.error) {
            state.error = false;
        }

        if (Object.keys(state).length > 0) {
            this.setState(state);
        }
    }

    handleVehicleError = () => {
        if (!this.state.error) {
            this.setState({ error: true });
        }
    }

    render() {
        const { error, changed } = this.state;
        return (
            <Page title="约车下单 - 修改车辆">
                <Vehicle onChange={this.handleVehicleChange} onError={this.handleVehicleError} defaultValue={this.vehicle} />

                <ButtonArea direction="horizontal">
                    <Button type="default" onClick={this.handleCancelClick}>返回</Button>
                    <Button type="warn" onClick={this.handleDeleteClick}>删除</Button>
                    <Button type="primary" onClick={this.handleSubmitClick} disabled={error || !changed}>修改</Button>
                </ButtonArea>
            </Page>
        );
    }
}

export default connect(modifySelector, { modify: updateVehicle })(Modify);