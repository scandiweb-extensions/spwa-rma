import CmsBlockQuery from 'Query/CmsBlock.query';

// this function injects the new link inside the text content.
const injectReturnsLinkIntoFooterLinks = (item) => {
    const returnsElem = document.createElement('a');
    returnsElem.setAttribute('class', 'Footer-ColumnItem');
    returnsElem.setAttribute('href', '/my-account/my-returns');
    returnsElem.textContent += 'Orders & Returns';

    // create an element and inject the item content into it, so it's a DOM object
    const domFromText = document.createElement('div');
    domFromText.innerHTML = item.content;

    const footerColumnElem = domFromText.querySelectorAll('.Footer-Column')[1]
        .querySelectorAll('.Footer-ColumnContent')[0];

    footerColumnElem.appendChild(returnsElem);

    const newItem = item;
    newItem.content = domFromText.outerHTML;
    return newItem;
};

const _getCmsBlock = (args, callback, instance) => {
    const { identifier } = instance.props;

    instance.fetchData(
        [CmsBlockQuery.getQuery({ identifiers: [identifier] })],
        ({ cmsBlocks: { items } }) => {
            if (!items.length) {
                return;
            }
            if (items[0].identifier === 'footer-links') {
                const item = injectReturnsLinkIntoFooterLinks(items[0]);
                instance.setState({ cmsBlock: item });
                return;
            }
            instance.setState({ cmsBlock: items[0] });
        }
    );
};

export default {
    'Component/CmsBlock/Container': {
        'member-function': {
            _getCmsBlock
        }
    }
};
