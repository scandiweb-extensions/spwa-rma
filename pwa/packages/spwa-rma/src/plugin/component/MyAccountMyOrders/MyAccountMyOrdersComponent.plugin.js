class MyAccountMyOrdersComponentPlugin {
    // adds return header to the table
    renderOrderHeadingRow = (_args, _callback, _instance) => (
            <tr>
            <th>{ __('Order') }</th>
            <th>{ __('Date') }</th>
            <th>{ __('Status') }</th>
            <th block="hidden-mobile">{ __('Total') }</th>
            <th block="hidden-mobile">{ __('Options') }</th>
            </tr>
    );
}

const { renderOrderHeadingRow } = new MyAccountMyOrdersComponentPlugin();

export default {
    'Component/MyAccountMyOrders/Component': {
        'member-function': {
            renderOrderHeadingRow
        }
    }
};
