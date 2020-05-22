import axios from "axios";
import { baseUrl,  optionsFecth,defaultUser, defaultTicket, defaultInvoice, defaultInvoiceItemType } from "../config";
import store from "../redux/index";

let user = store.getState().user || null;

store.subscribe(() => {
  user = store.getState().user || null;
});

const get = async (model,params)=>{
  try {
    const data = await fetch(`${baseUrl}/${model}${params ?`/${params}`:""}`)
    return {data: await data.json()};
  } catch (error) {
    return {data:[]}
  }
} 

const edit = (model,id,properties) => fetch(`${baseUrl}/${model}/${id}`, {
  ...optionsFecth,
  method: "PATCH",
  body: JSON.stringify(properties) 
});

const create = (model,properties) => fetch(`${baseUrl}/${model}`, {
  ...optionsFecth,
  method: "POST",
  body: JSON.stringify(properties) 
});

export const getModel = get;
export const editModel = model => (id,properties) => edit(model,id,properties);

export const signIn = (user, password) => {
  return axios.post(`${baseUrl}/auth/login`, {
    method: "POST",
    body: { user, password }
  });
};

export const getAllTickets = userId => {
  const params = userId ? `?userId=${userId}` : "";
  return get("tickets",params);
};

export const getAllUsers = () => get("users")

export const getAllUserTypes = () => {
  return get("roles");
};

export const addInvoices = invoice => create("invoice",{
  ...defaultInvoice,
  ...invoice
});
export const addInvoicesItemTypes = itemType => create("invoiceItemType",{
  ...defaultInvoiceItemType,
  ...itemType
});
export const addTickets = (ticket,userId) => create("tickets",{
  ...defaultTicket,
  userId,
  ...ticket
});
export const addUserTypes = userType => create("roles",{
      name: "dafault",
      ...userType
    });

export const addUser = user => create("users",{
  ...defaultUser,
  ...user
});

export const deleteTickets = ticketId => {
  return fetch(`${baseUrl}/tickets/${ticketId}`,{method:"DELETE"});

};
export const deleteUserTypes = userTypeId => {
  return fetch(`${baseUrl}/roles/${userTypeId}`,{method:"DELETE"});
};

export const deleteUser = userId => {
  return fetch(`${baseUrl}/users/${userId}`,{method:"DELETE"});
};

export const updateUser = (userId, properties) => edit("users",userId,properties);

export const updateUserTypes = (id, properties) => edit("roles",id, properties)

export const updateTicket = (id, properties) => edit("tickets",id, properties)