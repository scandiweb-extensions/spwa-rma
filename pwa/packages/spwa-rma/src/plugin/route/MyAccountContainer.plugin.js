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

// FIX: container -> config
import { MY_ACCOUNT_URL } from 'SourceRoute/MyAccount/MyAccount.config';
import { DASHBOARD } from 'Type/Account';

export const MY_RETURNS = 'my-returns';

export class MyAccountContainerPlugin {
    returnTabMap = {
        url: '/my-returns',
        name: __('My returns')
    };

    /**
     * Tab map
     * @param originalMember
     * @returns {*}
     */
    // aroundTabMap = (args, callback) => {
    //     console.log('!!!', args, callback);
    //     return {
    //         ...args,
    //         [MY_RETURNS]: this.returnTabMap
    //     };
    // }
    aroundTabMap = (originalMember) => ({
        ...originalMember,
        [MY_RETURNS]: this.returnTabMap
    });

    /**
     * Update breadcrumbs
     * @param args
     * @param callback
     * @param instance
     */
    aroundUpdateBreadcrumbs = (args, callback, instance) => {
        const { updateBreadcrumbs } = instance.props;
        const { activeTab } = instance.state;
        if (activeTab === MY_RETURNS) {
            const { url, name } = this.returnTabMap;

            updateBreadcrumbs([
                { url: `${ MY_ACCOUNT_URL }${ url }`, name },
                { name: __('My Account'), url: `${ MY_ACCOUNT_URL }/${ DASHBOARD }` }
            ]);
        } else {
            callback.apply(instance, args);
        }
    };
}

export const { aroundTabMap, aroundUpdateBreadcrumbs } = new MyAccountContainerPlugin();

export default {
    'Route/MyAccount/Container': {
        'static-member': {
            tabMap: [
                {
                    position: 10000000,
                    implementation: aroundTabMap
                }
            ]
        },
        'member-function': {
            updateBreadcrumbs: [
                {
                    position: 100,
                    implementation: aroundUpdateBreadcrumbs
                }
            ]
        }
    }
};
