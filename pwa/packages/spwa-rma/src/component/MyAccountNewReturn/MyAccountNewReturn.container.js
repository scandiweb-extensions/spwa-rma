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
import OrderQuery from 'Query/Order.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { OrderDispatcher } from 'Store/Order/Order.dispatcher';
import { customerType } from 'Type/Account';
import { fetchMutation, fetchQuery } from 'Util/Request';

import ProductReturnQuery from '../../query/ProductReturn.query';
import MyAccountNewReturn from './MyAccountNewReturn.component';

/** @namespace SpwaRma/Component/MyAccountNewReturn/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer
});

/** @namespace SpwaRma/Component/MyAccountNewReturn/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    getOrderList: () => OrderDispatcher.requestOrders(dispatch),
    showNotification: (type, title, error) => dispatch(showNotification(type, title, error)),
    showSuccessNotification: (message) => dispatch(showNotification('success', message))
});

/** @namespace SpwaRma/Component/MyAccountNewReturn/Container/MyAccountNewReturnContainer */
export class MyAccountNewReturnContainer extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired,
        showNotification: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {
        reasonData: {},
        isLoading: false,
        orderId: '',
        items: [],
        createdAt: '',
        shippingAddress: null
    };

    containerFunctions = {
        onNewRequestSubmit: this.onNewRequestSubmit.bind(this)
    };

    componentDidMount() {
        this.requestData();
    }

    onError = (e) => {
        const { showNotification } = this.props;

        this.setState({ isLoading: false }, () => {
            showNotification('error', 'Error mutation New Return!', e);
        });
    };

    async onNewRequestSubmit(options) {
        const { showSuccessNotification, history } = this.props;

        const mutation = ProductReturnQuery.getNewReturnMutation(options);

        this.setState({ isLoading: true });

        fetchMutation(mutation).then(
            /** @namespace SpwaRma/Component/MyAccountNewReturn/Container/fetchMutation/then */
            ({ createReturnRequest: { return_id } }) => {
                this.setState({ isLoading: false }, () => {
                    showSuccessNotification(__(`Return successfully made, order ID: ${ return_id }`));
                });

                history.goBack();
            },
            this.onError
        );
    }

    requestData() {
        const { showNotification, history: { location: { pathname } } } = this.props;

        const orderId = pathname
            .split('/')[3] // eslint-disable-line no-magic-numbers
            .split('&')[1]
            .split('=')[1];

        return fetchQuery([
            ProductReturnQuery.getRmaConfiguration(),
            OrderQuery.getOrderByIdQuery(orderId)
        ]).then(
            /** @namespace SpwaRma/Component/MyAccountNewReturn/Container/fetchQuery/then */
            ({
                getRmaConfiguration: {
                    reasons,
                    resolutions,
                    conditions
                },
                getOrderById: {
                    order_products: items,
                    base_order_info: { created_at: createdAt },
                    shipping_info: { shipping_address: shippingAddress }
                }
            }) => {
                const reasonData = { reasons, resolutions, conditions };

                this.setState({
                    reasonData,
                    items,
                    orderId,
                    createdAt,
                    shippingAddress
                });
            },
            /** @namespace SpwaRma/Component/MyAccountNewReturn/Container/fetchQuery/then */
            (e) => showNotification('error', 'Error fetching New Return!', e)
        );
    }

    render() {
        return (
            <MyAccountNewReturn
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountNewReturnContainer);
