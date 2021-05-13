import getServerAddress from "./ServerAddress";

async function getCompleteRecipes() {
  const request = `${getServerAddress()}/api/v1/recipes/complete/`;
  const response = await fetch(request);
  //console.log("response: " + response.json())
  const data = await response.json();
  return data.recipes;
}

export { getCompleteRecipes };
