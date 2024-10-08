import axios from "axios";

const TASKS_URL = "http://localhost:5000/tasks";

export const getTasks = async () => {
  const response = await axios.get(TASKS_URL);
  return response.data;
};

export const addTask = async task => {
  const response = await axios.post(TASKS_URL, task);
  return response.data;
};

export const updateTask = async task => {
  const response = await axios.put(`${TASKS_URL}/${task.id}`, task);
  return response.data;
};

export const deleteTask = async id => {
  await axios.delete(`${TASKS_URL}/${id}`);
};
