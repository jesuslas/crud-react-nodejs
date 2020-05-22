export const baseUrl = "http://localhost:8686/api";

export const optionsFecth = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
}

export const defaultTicket = {
    ticket_pedido: "default",
    status: "Created",
  }

  export const defaultUser = {
    name: "default",
    roleId: 1,
    email: "co@co.com",
    password: "123",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  export const defaultInvoice = {
    name: "default",
    number: 0,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  export const defaultInvoiceItemType = {
    name: "default",
    number: 0,
  }

