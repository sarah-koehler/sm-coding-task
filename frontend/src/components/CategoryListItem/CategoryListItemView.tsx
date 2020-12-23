import React, { KeyboardEvent, useRef, useState } from 'react';
import {
    ListGroup,
    Form,
    Badge,
    Alert,
} from 'react-bootstrap';
import {
    Pencil,
    Check2,
    Trash,
    PlusCircleFill,
    X,
} from 'react-bootstrap-icons';
import IconButton from '../IconButton';
import type { Category, CreateCategory } from '../../models/Category';
import './CategoryListItem.scss';

const NEW_CATEGORY: CreateCategory = {
    name: '',
};

type Props = {
    category?: Category,
    editMode?: boolean,
    addMode?: boolean,
    onCancel: () => any,
    onRemove: () => any,
    onSave?: (category: Category) => any,
    onAdd?: (category: CreateCategory) => any,
    onStartEdit?: () => any,
    onEdit?: () => any,
};

const CategoryListItem = (props: Props): JSX.Element => {
    const {
        category,
        editMode,
        addMode,
        onCancel,
        onRemove,
        onSave,
        onStartEdit,
        onEdit,
        onAdd,
    } = props;
    const name = category ? category.name : '';
    const keywords = category ? category.keywords : [];
    const [addKeywordMode, setAddKeywordMode] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const categoryInputRef = useRef<HTMLInputElement>(null);
    const keywordInputRef = useRef<HTMLInputElement>(null);
    const handleNameChange = () => {
        if (!categoryInputRef.current) {
            return;
        }
        const { value } = categoryInputRef.current;

        if (category && onSave) {
            onSave({
                ...category,
                name: value.trim(),
            });
        } else if (!category && onAdd) {
            onAdd({
                ...NEW_CATEGORY,
                name: value.trim(),
            });
        }
    };
    const handleKeywordAdd = () => {
        if (!keywordInputRef.current || !category || !onSave) {
            return;
        }
        const value = keywordInputRef.current.value.trim();

        if (!value) {
            setError('Keyword cannot be empty');
            return;
        }
        const duplicated = category.keywords.includes(value);

        if (duplicated) {
            setError(`"${value}" keyword is already added to this category`);
            return;
        }
        const updatedCategory = {
            ...category,
            keywords: [...category.keywords, value],
        };

        setAddKeywordMode(false);
        setError(null);
        onSave(updatedCategory);
    };
    const handleKeywordRemove = (keyword: string) => {
        if (!category || !onSave) {
            return;
        }
        const updatedCategory = {
            ...category,
            keywords: category.keywords.filter((k) => k !== keyword),
        };

        onSave(updatedCategory);
    };

    return (
        <ListGroup.Item className="CategoryListItem">
            {error && <Alert className="mb-2" variant="danger">{error}</Alert>}
            <div className="d-flex justify-content-between align-items-center">
                <div className="flex-fill mr-3">
                    {editMode || addMode ? (
                        <Form.Control
                            ref={categoryInputRef}
                            type="text"
                            placeholder="Category name"
                            defaultValue={name}
                            onBlur={handleNameChange}
                            onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }}
                            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Escape') {
                                    onCancel();
                                }
                            }}
                            onChange={onEdit}
                            autoFocus
                        />
                    ) : name}
                </div>
                <div>
                    <IconButton
                        className="mr-3"
                        Icon={editMode || addMode ? Check2 : Pencil}
                        color="secondary"
                        size={24}
                        onClick={() => {
                            if (editMode || addMode) {
                                handleNameChange();
                            } else if (onStartEdit) {
                                onStartEdit();
                            }
                        }}
                    />
                    <IconButton
                        Icon={Trash}
                        color="secondary"
                        size={24}
                        onClick={() => {
                            if (addMode) {
                                onCancel();
                            } else {
                                onRemove();
                            }
                        }}
                    />
                </div>
            </div>
            {!addMode && (
                <div className="keywords d-flex flex-wrap">
                    {keywords.map((k) => (
                        <Badge
                            key={k}
                            className="mr-2 mt-2 d-inline-flex align-items-center"
                            pill
                            variant="primary"
                        >
                            {k}
                            <IconButton
                                Icon={X}
                                className="ml-1"
                                color="text-white"
                                size={18}
                                onClick={() => handleKeywordRemove(k)}
                            />
                        </Badge>
                    ))}
                    {addKeywordMode ? (
                        <Form.Control
                            ref={keywordInputRef}
                            className="mr-2 mt-2 d-inline"
                            size="sm"
                            type="text"
                            placeholder="Keyword"
                            onBlur={() => setAddKeywordMode(false)}
                            onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                    handleKeywordAdd();
                                }
                            }}
                            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Escape') {
                                    setAddKeywordMode(false);
                                    setError(null);
                                }
                            }}
                            autoFocus
                        />
                    ) : (
                        <IconButton
                            className="mr-2 mt-2"
                            Icon={PlusCircleFill}
                            color="primary"
                            size={31}
                            onClick={() => setAddKeywordMode(true)}
                        />
                    )}
                </div>
            )}
        </ListGroup.Item>
    );
};

CategoryListItem.defaultProps = {
    category: undefined,
    editMode: false,
    addMode: false,
    onStartEdit: undefined,
    onEdit: undefined,
    onSave: undefined,
    onAdd: undefined,
};

export default CategoryListItem;
