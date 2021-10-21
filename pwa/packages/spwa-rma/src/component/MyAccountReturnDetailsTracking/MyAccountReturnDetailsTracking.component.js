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

import './MyAccountReturnDetailsTracking.style';

/** @namespace SpwaRma/Component/MyAccountReturnDetailsTracking/Component/MyAccountReturnDetailsTrackingComponent */
export class MyAccountReturnDetailsTrackingComponent extends PureComponent {
    /**
     * Prop types
     * @type {*}
     */
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        tracking: PropTypes.array.isRequired
    };

    /**
     * Render tracking information table head
     * @returns {*}
     */
    renderTrackingInformationTableHead() {
        const { tracking = [] } = this.props;

        return (
            <table
              block="MyAccountReturnDetailsTracking"
              elem="Table"
            >
                <thead>
                <tr>
                    <th>{ __('Carrier') }</th>
                    <th>{ __('Tracking number') }</th>
                </tr>
                </thead>
                <tbody>
                { tracking.map(this.renderTrackingInformationTableRow) }
                </tbody>
            </table>
        );
    }

    /**
     * Render tracking information table row
     * @param carrier_title
     * @param track_number
     * @param index
     * @returns {*}
     */
    renderTrackingInformationTableRow({ carrier_title, track_number }, index) {
        return (
            <tr key={ index }>
                <td>{ carrier_title }</td>
                <td>{ track_number }</td>
            </tr>
        );
    }

    /**
     * Render tracking information table
     * @returns {*}
     */
    renderTrackingInformationTable() {
        const { tracking = [] } = this.props;

        if (!tracking.length) {
            return <span>No tracking</span>;
        }

        return (
            <div>
                { this.renderTrackingInformationTableHead() }
            </div>
        );
    }

    /**
     * Render
     * @returns {null|*}
     */
    render() {
        const { tracking = [] } = this.props;

        if (!tracking.length) {
            return null;
        }

        return (
            <>
                <h4 block="MyAccountReturnDetailsTracking" elem="Title">Tracking Information</h4>
                { this.renderTrackingInformationTable() }
            </>
        );
    }
}

export default MyAccountReturnDetailsTrackingComponent;
