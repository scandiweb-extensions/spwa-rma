/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TextPlaceholder from 'Component/TextPlaceholder';
import OrderDispatcher from 'SourceStore/Order/Order.dispatcher';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { ordersType } from 'Type/Account';

import { ReturnDispatcher } from '../../store/Return';
import { MY_RETURN, NEW_RETURN, RETURN_DETAILS } from '../../util/Rma/Rma';
import getActivePage from '../../util/Url/ReturnUrl';
import MyAccountNewReturn from '../MyAccountNewReturn';
import MyAccountReturnDetails from '../MyAccountReturnDetails';
import MyAccountMyReturns from './MyAccountMyReturns.component';

export const HEADER_MY_RETURN = 'my-returns';

/** @namespace SpwaRma/Component/MyAccountMyReturns/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    orderList: state.OrderReducer.orderList,
    areOrdersLoading: state.OrderReducer.isLoading,
    returnList: state.ReturnReducer.returnList,
    areReturnsLoading: state.ReturnReducer.isLoading
});

/** @namespace SpwaRma/Component/MyAccountMyReturns/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    getOrderList: () => OrderDispatcher.requestOrders(dispatch),
    getReturnList: () => ReturnDispatcher.requestReturns(dispatch),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace SpwaRma/Component/MyAccountMyReturns/Container/MyAccountMyReturnsContainer */
export class MyAccountMyReturnsContainer extends PureComponent {
    static propTypes = {
        orderList: ordersType.isRequired,
        getOrderList: PropTypes.func.isRequired,
        returnList: PropTypes.array.isRequired,
        getReturnList: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        changeHeaderState: PropTypes.func.isRequired
    };

    state = {
        activePage: this.getActivePage(),
        selectedOrderId: ''
    };

    renderMap = {
        [MY_RETURN]: {
            component: MyAccountMyReturns,
            title: __('My returns')
        },
        [NEW_RETURN]: {
            component: MyAccountNewReturn,
            title: __('New return for order #')
        },
        [RETURN_DETAILS]: {
            component: MyAccountReturnDetails,
            title: __('Return #')
        }
    };

    containerFunctions = {
        handleReturnClick: this.handleReturnClick.bind(this),
        handleReturnItemClick: this.handleReturnItemClick.bind(this),
        handleDropdownChange: this.handleDropdownChange.bind(this)
    };

    componentDidMount() {
        this.toggleDefaultHeaderTitle(false);

        const { getOrderList, getReturnList } = this.props;

        getOrderList();
        getReturnList();

        this.handleFirstLoadHeaderChange();
    }

    componentDidUpdate() {
        const { activePage: prevActivePage } = this.state;
        const activePage = this.getActivePage();

        if (prevActivePage !== activePage) {
            this.handlePageChange(prevActivePage);
        }
    }

    componentWillUnmount() {
        this.toggleDefaultHeaderTitle(true);
    }

    toggleDefaultHeaderTitle = (show) => {
        const defaultHeaderTitle = document.getElementsByClassName('MyAccount-Heading');

        if (defaultHeaderTitle.length) {
            defaultHeaderTitle[0].style.display = show ? 'block' : 'none';
        }
    };

    getActivePage() {
        const { history: { location: { pathname } } } = this.props;

        return getActivePage(pathname);
    }

    handleFirstLoadHeaderChange() {
        const activePage = this.getActivePage();

        if (activePage === NEW_RETURN || activePage === RETURN_DETAILS) {
            setTimeout(() => this.changeHeaderState(), 1);
        }
    }

    handleReturnListReload(prevActivePage, activePage) {
        const { getReturnList } = this.props;

        if (activePage !== MY_RETURN || prevActivePage === MY_RETURN) {
            return;
        }

        getReturnList();
    }

    handlePageChange(prevActivePage) {
        const activePage = this.getActivePage();

        if (activePage === NEW_RETURN || activePage === RETURN_DETAILS) {
            this.changeHeaderState();
        }

        this.handleReturnListReload(prevActivePage, activePage);
        this.setState({ activePage });
    }

    handleReturnClick(selectedOrderId) {
        const { history } = this.props;

        history.push({ pathname: `/my-account/my-returns/new-return&id=${ selectedOrderId }` });
        this.handlePageChange();
    }

    handleReturnItemClick(entityId) {
        const { history } = this.props;

        history.push({ pathname: `/my-account/my-returns/return-details&id=${ entityId }` });
        this.handlePageChange();
    }

    handleDropdownChange(id) {
        this.setState({ selectedOrderId: id });
    }

    changeHeaderState() {
        const {
            changeHeaderState,
            history
        } = this.props;

        changeHeaderState({
            name: HEADER_MY_RETURN,
            title: __('My returns'),
            onBackClick: () => history.goBack()
        });
    }

    renderPageTitle = (customValue) => {
        const { activePage } = this.state;

        const { title } = this.renderMap[activePage];

        const id = customValue !== undefined
            ? <TextPlaceholder content={ customValue } length="short" />
            : '';

        return (
            <h1
              block="MyAccount"
              elem="Heading"
            >
                { title }
                { id }
            </h1>
        );
    };

    render() {
        const { activePage } = this.state;
        const { component: Page } = this.renderMap[activePage];
        return (
            <Page
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              renderPageTitle={ this.renderPageTitle }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountMyReturnsContainer));
