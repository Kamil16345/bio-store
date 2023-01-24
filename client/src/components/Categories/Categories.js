import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import maintainCategories from "../../services/maintainCategories";

export const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    navigationCategories();
  }, []);

  function navigationCategories() {
    maintainCategories
      .getAllCategories()
      .then((response) => {
        setCategories(response.data);
        let categoriesDiv = document.getElementById("categories");
        let children = categoriesDiv.children;

        setTimeout(() => {
          for (let i = 0; i < response.data.length; i++) {
            children[i].children[0].dataset.categoryId = response.data[i]._id;
          }
        }, 20);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function redirectToCategory(event) {

    let clickedCategory = event.target;
    let categoryId = clickedCategory.getAttribute("data-category-id");
    let category = await maintainCategories.getCategory(categoryId);
    console.log("category: ")
    console.log(category)
    navigate(`/${categoryId}`, {
      state: {
        id: category.data._id,
        name: category.data.name,
        products: category.data.products,
      },
    });
    //window.location.reload()
  }

  return (
    <>
      <div>Categories</div>
      <div className="categories" id="categories">
        {categories.map((category) => (
          <div className="categoryCard" key={category.id}>
            <button onClick={(event) => redirectToCategory(event)}>
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
