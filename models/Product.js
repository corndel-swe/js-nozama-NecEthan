import db from '../db/index.js'


class Product {

    static async listOfProducts() {

        const query = `SELECT * FROM products`;
        const results = await db.raw(query);
        return results;
    }

    static async getProductById(id) {
        const query = `SELECT * FROM products WHERE id = ?`;
        const results = await db.raw(query, [id]);
        if (results.length === 0) {
            throw new Error('User not found');
        }
        return results[0];
    }

    static async AddProduct(product) {

        const {name, description, price, stockQuantity, imageURL} = product;

        const query = `INSERT INTO products (name, description, price,
         stockQuantity, imageURL) VALUES (?, ?, ?, ?, ?)`

        await db.raw(query, [name, description, price, stockQuantity, imageURL]);
        
    }

    static async getProductsByCategory(categoryId) {
        const query = `
            SELECT p.id, p.name, p.description, p.price, p.stockQuantity, p.imageURL
            FROM products p
            JOIN product_categories pc ON p.id = pc.productId
            WHERE pc.categoryId = ?
        `;
        
        const results = await db.raw(query, [categoryId]);
        if (results.length === 0) {
            throw new Error('Category not found')
        }

        return results;


    }
    
}

export default Product