export const categrizeIngredient=(ingredients)=>{
    return ingredients.reduce((acc,ingredient)=>{
        const {category}=ingredient //here we are destructuring the category from ingredient array
        if(!acc[category.name]){//here we are checking the key is already present inside acc or not. acc is accumulator. It is an object
            acc[category.name]=[];
        }

        acc[category.name].push(ingredient);
        return acc;

    },{})
}

//acc value is empty object