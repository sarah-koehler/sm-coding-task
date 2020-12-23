import * as React from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import IconButton from '../IconButton';
import { appMutations } from '../../operations/mutations';

const { setKeywordManagerStateState } = appMutations;

const AddCategoryButton = (): JSX.Element => (
    <IconButton
        Icon={PlusCircle}
        onClick={() => setKeywordManagerStateState({ addMode: true, editId: null })}
    />
);

export default AddCategoryButton;
