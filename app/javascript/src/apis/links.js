import axios from "axios";

const list = () => axios.get("/links");

const link = payload => axios.get(`/${payload}`);

const create = payload => axios.post("/links", payload);

const update = (id, payload) => axios.put(`/links/${id}`, payload);

const linksApi = {
  list,
  link,
  create,
  update
};

export default linksApi;
