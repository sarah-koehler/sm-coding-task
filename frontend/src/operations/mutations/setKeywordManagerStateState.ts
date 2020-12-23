import { ReactiveVar } from '@apollo/client';
import { KeywordManagerState } from '../../models/KeywordManagerState';

export default (
    keywordManagerStateReactiveVar: ReactiveVar<KeywordManagerState>,
) => (state: KeywordManagerState): void => {
    keywordManagerStateReactiveVar(state);
};
