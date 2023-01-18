import React, { useState, useEffect } from 'react'

import {Categories} from '../Categories/Categories'
import {Products} from '../Products/Products'

export const Home=()=>{
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    
    return(
        <div className='App'>
            <Categories />
            <Products />
        </div>
    )
 
}