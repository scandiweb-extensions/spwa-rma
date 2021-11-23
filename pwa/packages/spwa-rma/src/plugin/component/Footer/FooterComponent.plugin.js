import ContentWrapper from 'Component/ContentWrapper';

import { COLUMN_MAP } from './FooterConfigLinks';

class FooterComponentPlugin {
    // this function only change is it uses our COLUMN_MAP instead of the default one
    renderColumns = (args, callback, instance) => (
            <ContentWrapper
              isNotSection
              wrapperMix={ { block: 'Footer', elem: 'Columns' } }
              label=""
            >
                    { COLUMN_MAP.map(instance.renderColumn) }
            </ContentWrapper>
    );
}

export const { renderColumns } = new FooterComponentPlugin();

export default {
    'Component/Footer/Component': {
        'member-function': {
            renderColumns
        }
    }
};
