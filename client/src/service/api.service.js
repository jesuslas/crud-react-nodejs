import axios from "axios";
import { baseUrl } from "../config";
import store from "../redux/index";

let user = store.getState().user || null;

store.subscribe(() => {
  user = store.getState().user || null;
});
console.log("user", user);
export const signIn = (user, password) => {
  console.log('baseUrl',baseUrl);
  return axios.post(`${baseUrl}/auth/login`, {
    method: "POST",
    body: { user, password }
  });
};

export const getAllTickets = userId => {
  const params = userId ? `?userId=${userId}` : "";
  return axios.get(`${baseUrl}/tickets${params}`);
};
export const getAllUsers = () => {
  return axios.get(`${baseUrl}/users`);
};
export const getAllUserTypes = () => {
  return axios.get(`${baseUrl}/roles`);
};

export const addTickets = (ticket, userId) => {
  return axios.post(`${baseUrl}/tickets`, {
    method: "POST",
    body: {
      ticket_pedido: "default",
      userId,
      status:"Created",
      ...ticket
    }
  });
};
export const addUserTypes = userType => {
  return axios.post(`${baseUrl}/roles`, {
    method: "POST",
    body: {
      name: "dafault",
      ...userType
    }
  });
};
export const addUser = user => {
  return axios.post(`${baseUrl}/users`, {
    method: "POST",
    body: {
      name: "default",
      roleId: 1,
      email: "co@co.com",
      password: "123",
      ...user
    }
  });
};
export const deleteTickets = ticket => {
  return axios.delete(`${baseUrl}/tickets/${ticket}`);
};
export const deleteUserTypes = userTypeId => {
  return axios.delete(`${baseUrl}/roles/${userTypeId}`);
};

export const deleteUser = userId => {
  return axios.delete(`${baseUrl}/users/${userId}`);
};

export const updateTicket = (ticketId, properties) => {
  return axios.patch(`${baseUrl}/tickets/${ticketId}`, {
    method: "PATCH",
    body: properties
  });
};

export const updateUser = (userId, properties) => {
  return axios.patch(`${baseUrl}/users/${userId}`, {
    method: "PATCH",
    body: properties
  });
};
export const updateUserTypes = (userTypeId, properties) => {
  return axios.patch(`${baseUrl}/roles/${userTypeId}`, {
    method: "PATCH",
    body: properties
  });
};
