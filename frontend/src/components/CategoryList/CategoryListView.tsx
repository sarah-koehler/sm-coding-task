import React, { useState } from 'react';
import {
    Alert,
    ListGroup,
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import CategoryListItem from '../CategoryListItem';
import ConfirmDialog from '../ConfirmDialog';
import Spinner from '../Spinner';
import { appMutations } from '../../operations/mutations';
import type {
    Category,
    CreateCategory,
    CategoryData,
    AddCategoryVars,
    UpdateCategoryVars,
    DeleteCategoryVars,
} from '../../models/Category';
import { GET_KEYWORD_MANAGER_STATE } from '../../operations/queries/getKeywordManagerState';
import { GET_CATEGORIES } from '../../operations/queries/getCategories';
import { ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../../operations/mutations/category';

const { setKeywordManagerStateState } = appMutations;

const CategoryList = (): JSX.Element => {
    // Queries
    const { addMode, editId } = useQuery(GET_KEYWORD_MANAGER_STATE).data.keywordManagerState;
    const {
        loading: loadingList,
        data,
        error: listError,
    } = useQuery<CategoryData>(GET_CATEGORIES);
    // Mutators
    const refetchQueries = [{ query: GET_CATEGORIES }];
    const [addCategory, { loading: loadingAdd, error: addError }] = useMutation<
        CategoryData,
        AddCategoryVars
    >(ADD_CATEGORY, { refetchQueries });
    const [updateCategory, { loading: loadingUpdate, error: updateError }] = useMutation<
        CategoryData,
        UpdateCategoryVars
    >(UPDATE_CATEGORY, { refetchQueries });
    const [deleteCategory, { loading: loadingDelete, error: deleteError }] = useMutation<
        { data: boolean },
        DeleteCategoryVars
    >(DELETE_CATEGORY, { refetchQueries });
    // Variables and State
    const loading = loadingList || loadingAdd || loadingUpdate || loadingDelete;
    const serverError = listError || addError || updateError || deleteError;
    const serverErrorMessage = serverError && serverError.message;
    const categories = data ? data.categories : [];
    const [removeId, setRemoveId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const cancelEditMode = () => {
        setKeywordManagerStateState({
            addMode: false,
            editId: null,
        });
        setError(null);
    };
    const setEditMode = (id: string) => setKeywordManagerStateState({
        addMode: false,
        editId: id,
    });
    const handleRemove = () => {
        if (removeId) {
            deleteCategory({ variables: { id: removeId } })
                .then(() => setRemoveId(null), () => undefined);
        }
    };
    const handleSave = (category: Category) => {
        if (!category.name) {
            setError('Category name cannot be empty');
            return;
        }
        updateCategory({ variables: { category } })
            .then(cancelEditMode, () => undefined);
    };
    const handleAdd = (category: CreateCategory) => {
        if (!category.name) {
            setError('Category name cannot be empty');
            return;
        }
        addCategory({ variables: { categoryData: category } })
            .then(cancelEditMode, () => undefined);
    };

    return (
        <>
            {!categories.length && !loading && (
                <Alert className="m-2" variant="warning">No categories found</Alert>
            )}
            {(error || serverErrorMessage) && (
                <Alert className="m-2" variant="danger">{error || serverErrorMessage}</Alert>
            )}
            <ListGroup variant="flush">
                {categories.map((category) => (
                    <CategoryListItem
                        key={category.id}
                        category={category}
                        editMode={category.id === editId}
                        onCancel={cancelEditMode}
                        onRemove={() => setRemoveId(category.id)}
                        onSave={handleSave}
                        onEdit={() => setError(null)}
                        onStartEdit={() => setEditMode(category.id)}
                    />
                ))}
                {addMode && (
                    <CategoryListItem
                        onCancel={cancelEditMode}
                        onRemove={cancelEditMode}
                        onEdit={() => setError(null)}
                        onAdd={handleAdd}
                        addMode
                    />
                )}
            </ListGroup>
            <ConfirmDialog
                show={!!removeId}
                onHide={() => setRemoveId(null)}
                onConfirm={handleRemove}
            >
                Are you sure you want to remove this category?
            </ConfirmDialog>
            <Spinner enabled={loading} />
        </>
    );
};

export default CategoryList;
