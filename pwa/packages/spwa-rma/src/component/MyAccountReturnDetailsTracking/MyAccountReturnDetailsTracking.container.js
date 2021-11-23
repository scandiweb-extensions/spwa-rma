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
import React from 'react';

import DataContainer from 'Util/Request/DataContainer';

import MyAccountReturnDetailsTracking from './MyAccountReturnDetailsTracking.component';

/** @namespace SpwaRma/Component/MyAccountReturnDetailsTracking/Container/MyAccountReturnDetailsTrackingContainer */
export class MyAccountReturnDetailsTrackingContainer extends DataContainer {
    /**
     * Prop types
     * @type {*}
     */
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        tracking: PropTypes.array.isRequired
    };

    /**
     * Remder
     * @returns {*}
     */
    render() {
        return (
            <MyAccountReturnDetailsTracking
              // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
              { ...this.props }
            />
        );
    }
}

export default MyAccountReturnDetailsTrackingContainer;
