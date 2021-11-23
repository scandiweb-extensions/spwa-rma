import { NEWSLETTER_COLUMN } from 'SourceComponent/Footer/Footer.config';
import facebookIcon from 'SourceStyle/icons/logos/facebook.svg';
import linkedinIcon from 'SourceStyle/icons/logos/linkedIn.svg';
import twitterIcon from 'SourceStyle/icons/logos/twitter.svg';

export const COLUMN_MAP = [
    {
        title: __('About'),
        items: [
            {
                href: '/about-us',
                title: __('About Us')
            }
        ]
    },
    {
        title: __('Additional info'),
        items: [
            {
                href: '/privacy-policy-cookie-restriction-mode',
                title: __('Privacy Policy')
            },
            {
                href: '/terms-and-conditions',
                title: __('Terms of use')
            },
            {
                href: '/privacy-policy-cookie-restriction-mode',
                title: __('Use of Cookies')
            },
            {
                href: '/my-account/my-returns',
                title: __('Orders & Returns')
            }
        ]
    },
    {
        title: __('Popular categories'),
        items: [
            {
                href: '/women',
                title: __('Women')
            },
            {
                href: '/men',
                title: __('Men')
            },
            {
                href: '/accessories',
                title: __('Accessories')
            }
        ]
    },
    {
        title: __('Follow'),
        isItemsHorizontal: true,
        items: [
            {
                href: 'https://www.linkedin.com/company/scandipwa',
                src: linkedinIcon,
                title: __('LinkedIn')
            },
            {
                href: 'https://www.facebook.com/ScandiPWA/',
                src: facebookIcon,
                title: __('Facebook')
            },
            {
                href: 'https://twitter.com/scandipwa',
                src: twitterIcon,
                title: __('Twitter')
            }
        ]
    },
    NEWSLETTER_COLUMN
];
