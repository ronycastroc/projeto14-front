import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: {
      Authorization: `Bear ${auth}`,
    },
  };

  return config;
}

function postSignUp(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
  return promise;
}

function postSignIn(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-in`, body);
  return promise;
}

function getProductsFromAPI() {
  const promise = axios.get(`${BASE_URL}/products`);
  return promise;
}

function getProductWithID(id) {
  const promise = axios.get(`${BASE_URL}/products/${id}`);
  return promise;
}

function getProductWithCategory(category) {
  const promise = axios.get(`${BASE_URL}/products/categories/${category}`);
  return promise;
}

export { postSignUp, postSignIn, getProductsFromAPI, getProductWithID, getProductWithCategory };
