import { gql } from '@apollo/client';

export const GET_NAVBAR_STATE = gql`
  query GetNavbarState {
    navbarState @client {
      title 
      actions
    }
  }
`;
