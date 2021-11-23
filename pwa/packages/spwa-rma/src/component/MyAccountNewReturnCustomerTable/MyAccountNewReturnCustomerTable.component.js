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

import React from 'react';

import MyAccountCustomerTable from 'Component/MyAccountCustomerTable/MyAccountCustomerTable.component';
import { customerType } from 'Type/Account';

/** @namespace SpwaRma/Component/MyAccountNewReturnCustomerTable/Component/MyAccountNewReturnCustomerTableComponent */
export class MyAccountNewReturnCustomerTableComponent extends MyAccountCustomerTable {
    static propTypes = {
        customer: customerType.isRequired
    };

    render() {
        const { customer } = this.props;

        return (
            <div
              block="MyAccountNewReturnCustomerTable"
              elem="MainWrapper"
            >
                { customer.email && this.renderTable() }
            </div>
        );
    }
}

export default MyAccountNewReturnCustomerTableComponent;
