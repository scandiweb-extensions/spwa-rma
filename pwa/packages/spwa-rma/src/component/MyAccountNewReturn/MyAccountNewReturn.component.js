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

import Field from 'Component/Field';
import Loader from 'Component/Loader';

import MyAccountNewReturnAddressTable from '../MyAccountNewReturnAddressTable';
import MyAccountNewReturnCustomerTable from '../MyAccountNewReturnCustomerTable';
import MyAccountNewReturnItemSelect from '../MyAccountNewReturnItemSelect';

import './MyAccountNewReturn.style';

/** @namespace SpwaRma/Component/MyAccountNewReturn/Component/MyAccountNewReturnComponent */
export class MyAccountNewReturnComponent extends PureComponent {
    static propTypes = {
        shippingAddress: PropTypes.object,
        reasonData: PropTypes.object.isRequired,
        orderId: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        renderPageTitle: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
        createdAt: PropTypes.string.isRequired,
        messageText: PropTypes.string.isRequired,
        hasItemsError: PropTypes.bool.isRequired,
        handleSelectedItemsChange: PropTypes.func.isRequired,
        handleTextAreaChange: PropTypes.func.isRequired,
        handleRequestSubmitPress: PropTypes.func.isRequired,
        isButtonEnabled: PropTypes.func.isRequired,
        handleBackPress: PropTypes.func.isRequired
    };

    static defaultProps = {
        shippingAddress: {}
    };

    renderActions() {
        const { handleBackPress, handleRequestSubmitPress, isButtonEnabled } = this.props;
        return (
            <div
              block="MyAccountNewReturn"
              elem="Actions"
            >
                <button
                  block="Button"
                  onClick={ handleRequestSubmitPress }
                  disabled={ isButtonEnabled() }
                >
                    { __('Submit request') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  onClick={ handleBackPress }
                >
                    { __('Cancel') }
                </button>
            </div>
        );
    }

    renderLoader() {
        const { isLoading } = this.props;
        return <Loader isLoading={ isLoading } />;
    }

    renderMessageTextArea() {
        const { handleTextAreaChange, messageText } = this.props;

        return (
            <Field
              type="textarea"
              placeholder="Please describe your issue in details."
              id="message"
              name="message"
              mix={ {
                  block: 'MyAccountNewReturn',
                  elem: 'MessageTextArea'
              } }
              value={ messageText }
              onChange={ handleTextAreaChange }
            />
        );
    }

    renderMessageSection() {
        return (
            <div>
                <h4
                  block="MyAccountNewReturn"
                  elem="MessageTitle"
                >
                    { __('Message:') }
                </h4>
                { this.renderMessageTextArea() }
            </div>
        );
    }

    render() {
        const {
            reasonData,
            items,
            createdAt,
            renderPageTitle,
            orderId = '',
            shippingAddress,
            handleSelectedItemsChange,
            hasItemsError
        } = this.props;

        return (
            <div block="MyAccountNewReturn">
                { this.renderLoader() }
                { renderPageTitle(orderId) }
                <div
                  block="MyAccountNewReturn"
                  elem="CustomerAndAddressBlocks"
                >
                    <MyAccountNewReturnCustomerTable />
                    <MyAccountNewReturnAddressTable address={ shippingAddress } />
                </div>
                <MyAccountNewReturnItemSelect
                  onItemChange={ handleSelectedItemsChange }
                  reasonData={ reasonData }
                  items={ items }
                  hasError={ hasItemsError }
                  createdAt={ createdAt }
                />
                { this.renderMessageSection() }
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountNewReturnComponent;
