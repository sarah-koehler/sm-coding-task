const { gql } = require('apollo-server');

module.exports = gql`
  type Category {
    id: String
    name: String
    keywords: [String]
  }
  input UpdateCategory {
    id: String
    name: String!
    keywords: [String]!
  }
  input CreateCategory {
    name: String
  }
  type Query {
    categories: [Category]
  }
  type Mutation {
    addCategory(categoryData: CreateCategory): Category
    updateCategory(category: UpdateCategory): Category!
    deleteCategory(id: String): Boolean
  }
`;
