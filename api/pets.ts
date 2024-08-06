import { createPostponedAbortSignal } from "next/dist/server/app-render/dynamic-rendering";
import { API_URL } from "./constants";

const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/pets`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const getOne = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/pet/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const createOne = async (form: FormData) => {
  form.append("pub_date", new Date().toISOString());
  try {
    const response = await fetch(`${API_URL}/pets`, {
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
    const response = await fetch(`${API_URL}/pet/${id}`, {
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
    const response = await fetch(`${API_URL}/pet/${id}`, {
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
    const response = await fetch(`${API_URL}/petTypes`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const getType = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/petType/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const createType = async (form: FormData) => {
  form.append("pub_date", new Date().toISOString());
  try {
    const response = await fetch(`${API_URL}/petTypes`, {
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
    const response = await fetch(`${API_URL}/petType/${id}`, {
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
    const response = await fetch(`${API_URL}/petType/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

export const petsApi = {
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
