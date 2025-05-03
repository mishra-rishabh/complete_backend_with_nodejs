const products = require("../data/products.js");

const resolvers = {
    Query: {
        products: () => products,
        product: (_, { id }) => products.find(item => item.id === id),
    },

    Mutation: {
        createProduct: (_, { title, category, price, inStock }) => {
            const newProduct = {
                id: String(products.length + 1),
                title,
                category,
                price,
                inStock
            }

            products.push(newProduct);

            return newProduct;
        },

        deleteProduct: (_, { id }) => {
            const productIndex = products.findIndex((product) => product.id === id);
            
            if(productIndex === -1) {
                return false;
            }

            products.splice(productIndex, 1);

            return true;
        },

        updateProduct: (_, { id, ...updates }) => {
            const index = products.findIndex((product) => product.id === id);

            if(index === -1) {
                return null;
            }

            const updatedProduct = {
                ...products[index],
                ...updates
            }

            products[index] = updatedProduct;

            return updatedProduct;
        },
    },
};

module.exports = resolvers;