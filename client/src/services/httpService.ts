import axios from 'axios';

const functions = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  create: axios.create,
};
export default functions;
