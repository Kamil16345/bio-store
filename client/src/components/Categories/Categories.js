import React, { useState, useEffect } from 'react'
import maintainCategories from '../../services/maintainCategories'

export const Categories = ()=>{

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        navigationCategories();
    }, []);
    function navigationCategories(){
        maintainCategories.getAllCategories()
        .then((response)=>{
            setCategories(response.data)
            console.log(categories)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    return (
        <div className="categories">
          <div>Categories</div>
          {categories.map((category) => (
            <div className="categoryCard" key={category.id}>
              <li><a href='http://gogle.pl'>{category.name}</a></li>
            </div>
          ))}
        </div>
      );
}


