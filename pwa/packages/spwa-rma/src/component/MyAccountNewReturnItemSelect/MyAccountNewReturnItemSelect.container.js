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

import omit from 'lodash/omit';
import React from 'react';

import DataContainer from 'Util/Request/DataContainer';

import MyAccountNewReturnItemSelect from './MyAccountNewReturnItemSelect.component';

/** @namespace SpwaRma/Component/MyAccountNewReturnItemSelect/Container/MyAccountNewReturnItemSelectContainer */
export class MyAccountNewReturnItemSelectContainer extends DataContainer {
    containerFunctions = {
        getCurrentProduct: this.getCurrentProduct.bind(this),
        handleItemSelect: this.handleItemSelect.bind(this),
        handleReasonBlockSelect: this.handleReasonBlockSelect.bind(this),
        handleQtyChange: this.handleQtyChange.bind(this)
    };

    state = {
        selectedItems: {}
    };

    handleItemSelect(isChecked, id) {
        const { onItemChange } = this.props;
        const { selectedItems: items } = this.state;
        // eslint-disable-next-line fp/no-let
        let selectedItems = { ...items };

        if (isChecked) {
            selectedItems = omit(selectedItems, id);
        } else {
            selectedItems[id] = {
                order_item_id: id,
                qty_requested: 0
            };
        }

        this.setState({ selectedItems });
        onItemChange(selectedItems);
    }

    handleReasonBlockSelect(blockId, key, id) {
        const { onItemChange } = this.props;
        const {
            selectedItems: items,
            selectedItems: { [id]: selectedItem }
        } = this.state;

        const selectedItems = {
            ...items,
            [id]: {
                ...selectedItem,
                [key]: blockId
            }
        };

        this.setState({ selectedItems });
        onItemChange(selectedItems);
    }

    handleQtyChange(qty, id) {
        const { onItemChange } = this.props;
        const {
            selectedItems: items,
            selectedItems: { [id]: selectedItem }
        } = this.state;

        const selectedItems = {
            ...items,
            [id]: {
                ...selectedItem,
                qty_requested: qty
            }
        };

        this.setState({ selectedItems });
        onItemChange(selectedItems);
    }

    getCurrentProduct() {
        const { item: { product } } = this.props;
        const variantIndex = this._getVariantIndex();

        return variantIndex < 0
            ? product
            : product.variants[variantIndex];
    }

    render() {
        return (
            <MyAccountNewReturnItemSelect
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default MyAccountNewReturnItemSelectContainer;
