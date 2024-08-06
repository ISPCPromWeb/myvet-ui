import { API_URL } from "./constants";

const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const getOne = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/product/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const createOne = async (form: FormData) => {
  form.append("pub_date", new Date().toISOString());
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const updateOne = async (id: number, form: FormData) => {
  form.append("pub_date", new Date().toISOString());
  try {
    const response = await fetch(`${API_URL}/product/${id}`, {
      method: "PUT",
      body: form,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const deleteOne = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/product/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const getTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/productTypes`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const getType = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/productType/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const createType = async (form: FormData) => {
  form.append("pub_date", new Date().toISOString());
  try {
    const response = await fetch(`${API_URL}/productTypes`, {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const updateType = async (id: number, form: FormData) => {
  form.append("pub_date", new Date().toISOString());
  try {
    const response = await fetch(`${API_URL}/productType/${id}`, {
      method: "PUT",
      body: form,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const deleteType = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/productType/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

export const productsApi = {
  getAll: getAll,
  getOne: getOne,
  createOne: createOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  getTypes: getTypes,
  getType: getType,
  createType: createType,
  updateType: updateType,
  deleteType: deleteType,
};
