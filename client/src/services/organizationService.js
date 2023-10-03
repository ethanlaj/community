import http from './httpService';
import config from '../config.js';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/organizations`;

export const getAll = async () => {
  const response = await http.get(apiEndpoint);
  return response.data;
};

export const getById = async (id) => {
  const response = await http.get(`${apiEndpoint}/${id}`);
  return response.data;
};

export const create = async (organization) => {
  const response = await http.post(apiEndpoint, organization);
  return response.data;
};

export const update = async (id, updatedOrganization) => {
  const response = await http.put(`${apiEndpoint}/${id}`, updatedOrganization);
  return response.data;
};

export const deleteOrganization = async (id) => {
  const response = await http.delete(`${apiEndpoint}/${id}`);
  return response.data;
};
