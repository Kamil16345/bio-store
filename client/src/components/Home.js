import React from 'react'
import maintainProducts from '../services/maintainProducts'

export const Home=()=>{
    return(
        <>
            <div>Welcome in bio-me store!</div>
            <button onClick={homePageProducts()}> getProducts</button>
        </>
    )
    function homePageProducts(){
        maintainProducts.getAllProducts()
        .then(response => {
            console.log(response.data)
        })
        .catch(e=>{
            console.log(e)
        })
    }  
}