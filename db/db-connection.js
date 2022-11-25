async function createCategory(){
    const category = new Category({

        name: 'gluten-free food'
    })
    const result = await category.save()
    //console.log(result);
}
//createCategory();

async function updateCategory(id){
    const category = await Category.findById(id)
    if(!category) return;
    category.name='kamil'
    const result = await category.save()
    //console.log(result)
}
//updateCategory('6380bb8791b29c253e10709b')

async function removeCategory(id){
    const category = await Category.deleteOne({_id: id})
    //console.log(category)
}

//removeCategory('6380bb8791b29c253e10709b')

async function getCategories(){
    const categories = await Category.find();
    //console.log(categories);
}
//getCategories();

module.exports.createCategory = createCategory;
module.exports.updateCategory = updateCategory;
module.exports.removeCategory = removeCategory;
module.exports.getCategories = getCategories;
module.exports.Category = Category;