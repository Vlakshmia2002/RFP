// frontend/src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // backend base
  timeout: 10000,
});

// RFPs
export const fetchRFPs = async () => {
  const res = await API.get("/rfps");
  return res.data || [];
};

export const createRFP = async (naturalText) => {
  // returns axios response
  return API.post("/rfps", { naturalText });
};

// Vendors
export const fetchVendors = async () => {
  const res = await API.get("/vendors");
  return res.data || [];
};

export const createVendor = async (payload) => {
  const res = await API.post("/vendors", payload);
  return res.data;
};

export const deleteVendor = async (id) => {
  const res = await API.delete(`/vendors/${id}`);
  return res.data;
};

// Proposals
export const fetchProposals = async () => {
  const res = await API.get("/proposals");
  return res.data || [];
};

export default API;
