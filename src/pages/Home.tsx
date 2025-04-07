// Home.tsx
import React, {useEffect, useState} from 'react';
import {Product} from '../types/product';
import ProductCard from '../components/ProductCard';
import './Home.scss';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch('https://fakestoreapi.com/products'),
                    fetch('https://fakestoreapi.com/products/categories')
                ]);
                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();
                setProducts(productsData);
                setCategories(['all', ...categoriesData]);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    if (loading) return <div className="home"><p>Loading products...</p></div>;
    if (error) return <div className="home"><p>{error}</p></div>;

    return (
        <div className="home">
            <h1>Products</h1>
            <div className="category-filters">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={cat === selectedCategory ? 'active' : ''}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
