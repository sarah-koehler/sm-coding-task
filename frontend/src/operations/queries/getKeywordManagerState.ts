import { gql } from '@apollo/client';

export const GET_KEYWORD_MANAGER_STATE = gql`
  query GetKeywordManagerState {
    keywordManagerState @client {
      addMode
      editId 
    }
  }
`;
