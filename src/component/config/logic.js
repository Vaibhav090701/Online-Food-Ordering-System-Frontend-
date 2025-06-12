export const isPresentInFavourites=(favourites,restaurent)=>{
      if (!Array.isArray(favourites)) return false;

    // here we are checking the restaurent is already in favourite list or not
    // we are checking one by one list of favourites by using for of loop
    for(let item of favourites)
        {
            if(restaurent.id===item.id)
                {
                    return true;
                }
        }
        return false;
}