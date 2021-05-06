export default function ingredientFound(ingredient, ingredientList){
  for (let index = 0; index < ingredientList.length; index++) {
    if(ingredientList[index].name === ingredient.name){
      return true;
    }  
  }
  return false;
}