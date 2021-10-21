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

import './MyAccountMyReturnsDropdown.style';

/** @namespace SpwaRma/Component/MyAccountMyReturnsDropdown/Component/MyAccountMyReturnsDropdownComponent */
export class MyAccountMyReturnsDropdownComponent extends PureComponent {
    state = {};

    static propTypes = {
        selectOptions: PropTypes.array,
        setChosenOrderId: PropTypes.func.isRequired,
        onSelectChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        selectOptions: []
    };

    onDropdownChange = (value) => {
        const { setChosenOrderId, onSelectChange } = this.props;

        this.setState(
            () => ({
                selectValue: value,
                selectValueText: this.getSelectValueText(value)
            }),
            () => setChosenOrderId(value)
        );
        onSelectChange(value);
    };

    getSelectValueText(value) {
        const { selectOptions } = this.props;
        const foundOption = selectOptions.filter((option) => option.value.toString() === value.toString())[0];

        return foundOption.label;
    }

    render() {
        const { selectOptions } = this.props;
        const { selectValue, selectValueText } = this.state;
        console.log('!!!', selectOptions);
        return (
            <Field
              id="order-to-return"
              name="order-to-return"
              type="select"
              placeholder={ selectValueText || __('Select order') }
              mix={ { block: 'MyAccountMyReturnsDropdown' } }
              selectOptions={ selectOptions }
              selectValue={ selectValue }
              validation={ ['notEmpty'] }
              onChange={ this.onDropdownChange }
            />
        );
    }
}

export default MyAccountMyReturnsDropdownComponent;
