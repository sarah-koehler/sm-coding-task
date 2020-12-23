const { RESTDataSource } = require('apollo-datasource-rest');
const { UserInputError } = require('apollo-server');
const crypto = require('crypto');

const NEW_KEYWORDS_LIMIT = 10;

// we use local variable to store categories
// since we don't have any back-end api for it yet
let categories = [];

class DatamuseAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.datamuse.com/';
    }

    async getSimilarWords(categoryName) {
        const result = await this.get('words', {
            rel_trg: categoryName
        });

        return result.slice(0, NEW_KEYWORDS_LIMIT).map(i => i.word);
    }

    getCategories() {
        return categories;
    }

    async addCategory({ name }) {
        const duplicated = !!categories.find(c => c.name === name);

        if (duplicated) {
            throw new UserInputError(`"${name}" category already exists`);
        }
        const category = {
            name,
            id: crypto.randomBytes(16).toString('hex'),
            keywords: await this.getSimilarWords(name),
        };

        categories.push(category);

        return category;
    }

    updateCategory(category) {
        const { id, name, keywords } = category;
        const duplicated = !!categories.find(c => c.id !== id && c.name === name);

        if (duplicated) {
            throw new UserInputError(`"${name}" category already exists`);
        }

        const index = categories.findIndex(c => c.id === id);
        const item = categories[index];

        if (!item) {
            throw new UserInputError('Category with such id is not found');
        }

        item.name = name || item.name;
        item.keywords = keywords || item.keywords;

        return item;
    }

    deleteCategory(id) {
        categories = categories.filter(c => c.id !== id);

        return true
    }
}

module.exports = DatamuseAPI;
