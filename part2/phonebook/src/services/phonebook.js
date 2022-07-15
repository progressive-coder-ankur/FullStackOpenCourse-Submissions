import axios from 'axios';
const baseUrl = '/api/persons';

const getAllPersons = () => {
  return axios.get(baseUrl);
};

const createNewPerson = newObject => {
  return axios.post(baseUrl, newObject);
};

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

const phonebookServices = {
  getAllPersons,
  createNewPerson,
  updatePerson,
  deletePerson,
};

export default phonebookServices;
