/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable react/jsx-no-bind */
import Html from 'Component/Html';
import { formatPrice } from 'Util/Price';

class MyAccountOrderTableRowComponentPlugin {
    // adds return link to the table
    render = (_args, _callback, instance) => {
        const {
            base_order_info: {
                created_at,
                status_label,
                increment_id,
                grand_total,
                id,
                status_can_be_returned
            },
            onViewClick,
            currency_code
        } = instance.props;

        return (
                <tr onClick={ onViewClick } block="MyAccountOrderTableRow">
                    <td>{ increment_id ? `#${increment_id}` : '' }</td>
                    <td>{ created_at }</td>
                    <td>{ status_label }</td>
                    <td block="hidden-mobile">
                        { grand_total ? formatPrice(grand_total, currency_code) : '' }
                    </td>
                    { status_label === 'Complete' && status_can_be_returned
                        ? this.renderReturnLink(id)
                        : (
                            <td block="hidden-mobile">
                                <p>Can't be returned!</p>
                            </td>
                        ) }
                </tr>
        );
    };

    renderReturnLink(id) {
        return (
            <td block="hidden-mobile">
                <Html content={ `<a block="hidden-mobile"href=/my-account/my-returns/new-return&id=${id}>Return</a>` } />
            </td>
        );
    }
}

const { render } = new MyAccountOrderTableRowComponentPlugin();

export default {
    'Component/MyAccountOrderTableRow/Component': {
        'member-function': {
            render
        }
    }
};
