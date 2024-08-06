import { API_URL } from "./constants";

const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/clients`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

const getOne = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/client/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

const createOne = async (form: FormData) => {
  form.append("pub_date", new Date().toISOString());
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

const updateOne = async (id: number, form: FormData) => {
  form.append("pub_date", new Date().toISOString());
  try {
    const response = await fetch(`${API_URL}/client/${id}`, {
      method: "PUT",
      body: form,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

const deleteOne = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/client/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const userApi = {
  getAll: getAll,
  getOne: getOne,
  createOne: createOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
};
