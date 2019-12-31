import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CategoriesSelector from './CategoriesSelector';

const App: React.FC = () => {

    const categories = [
        {
            "id": "mens",
            "name": "Mens",
            "description": "",
            "image": "http://foo.com.bar.jpg",
            "thumbnail": "http://foo.com.bar.jpg",
            "parent_category_id": "root",
            "categories": [{
                "id": "footwear",
                "name": "Footwear",
                "description": "",
                "image": "http://foo.com.bar.jpg",
                "thumbnail": "http://foo.com.bar.jpg",
                "parent_category_id": "mens"
            }, {
                "id": "clothing",
                "name": "Clothing",
                "description": "",
                "image": "http://foo.com.bar.jpg",
                "thumbnail": "http://foo.com.bar.jpg",
                "parent_category_id": "mens"
            }]
        },
        {
            "id": "womens",
            "name": "Womens",
            "description": "",
            "image": "http://foo.com.bar.jpg",
            "thumbnail": "http://foo.com.bar.jpg",
            "parent_category_id": "root",
            "categories": [{
                "id": "footwear",
                "name": "Footwear1",
                "description": "",
                "image": "http://foo.com.bar.jpg",
                "thumbnail": "http://foo.com.bar.jpg",
                "parent_category_id": "womens"
            }, {
                "id": "clothing",
                "name": "Clothing2",
                "description": "",
                "image": "http://foo.com.bar.jpg",
                "thumbnail": "http://foo.com.bar.jpg",
                "parent_category_id": "womens"
            }]
        }];
    return (
        <div>
            <CategoriesSelector categories={categories} />
        </div>
    );
}

export default App;
