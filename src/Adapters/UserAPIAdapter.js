import getServerAddress from "./ServerAddress";

async function getUserData(user) {
  let request = `${getServerAddress()}/api/v1/users/${user.username}/add-user/`; // add-user only adds if needed
  let userData = put(request);
  return userData;
}

async function updateUserFavorites(user, favorites) {
  let request = `${getServerAddress()}/api/v1/users/${
    user.username
  }/update-favorites/`; // add-user only adds if needed
  let response = await patch(request, favorites);
  console.log(response);
}

async function updateUserIngredients(user, ingredients) {
  let request = `${getServerAddress()}/api/v1/users/${
    user.username
  }/update-ingredients/`; // add-user only adds if needed
  let response = await patch(request, ingredients);
  console.log(response);
}

async function put(request) {
  let response = await fetch(request, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    method: "PUT",
  });
  let data = await response.json();

  return data;
}

async function patch(request, data) {
  let response = await fetch(request, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return response;
}

export { getUserData, updateUserFavorites, updateUserIngredients };
