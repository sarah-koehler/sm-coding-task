module.exports = {
    Query: {
        categories: (_, __, { dataSources }) => dataSources.datamuseAPI.getCategories(),
    },
    Mutation: {
        addCategory: async (_, { categoryData }, { dataSources }) => dataSources.datamuseAPI.addCategory(categoryData),
        updateCategory: (_, { category }, { dataSources }) => dataSources.datamuseAPI.updateCategory(category),
        deleteCategory: (_, { id }, { dataSources }) => dataSources.datamuseAPI.deleteCategory(id),
    },
};
