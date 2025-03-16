export const categrizeIngredient = (ingredients) => {
    // Check if ingredients is undefined or not an array
    if (!ingredients || !Array.isArray(ingredients)) {
      return {}; // Return an empty object if ingredients is invalid
    }
  
    return ingredients.reduce((acc, ingredient) => {
      const { category } = ingredient; // Destructure the category from the ingredient
      if (!acc[category.name]) { // Check if the category key exists in the accumulator
        acc[category.name] = []; // Initialize the category key with an empty array
      }
  
      acc[category.name].push(ingredient); // Push the ingredient into the category array
      return acc; // Return the accumulator for the next iteration
    }, {}); // Initialize the accumulator as an empty object
  };