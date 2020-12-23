import { gql } from '@apollo/client';

export const ADD_CATEGORY = gql`
  mutation AddCategory($categoryData: CreateCategory) {
    addCategory(categoryData: $categoryData) {
      id
      name
      keywords
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($category: UpdateCategory) {
    updateCategory(category: $category) {
      id
      name
      keywords
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String) {
    deleteCategory(id: $id)
  }
`;
