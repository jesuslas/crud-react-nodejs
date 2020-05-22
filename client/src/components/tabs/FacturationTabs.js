import React from "react";
import MyTickets from "../../pages/MyTickets";
import UserTypes from "../../pages/UserTypes";
import InvoiceItemTypes from "../../pages/invoice/invoiceItemType";
import Invoices from "../../pages/invoice/invoices";
import Invoice from "../../pages/invoice/invoice";
import TabsRouter from "./tabRouter";
import SubTabsAuth from "./TabsAuth";
import SubTabsInvoice from "./TabsAuth";
const Tabs = props => {
  const { isAdmin } = props;
  const tabs = [
    {
      label: "Item",
      to: "/item",
      render: () => <Invoice {...{ ...props }} />
    },
    ...(isAdmin
      ? [
          {
            label: "Invoices",
            to: "/invoices",
            render: () => <Invoices {...{ ...props }} />
          },
          {
            label: "Invoice Item",
            to: "/itemType",
            render: () => <UserTypes {...{ ...props }} />
          },
          {
            label: "Invoice Item Types",
            to: "/invoiceItemTypes",
            render: () => <InvoiceItemTypes {...{ ...props }} />
          }
        ]
      : [])
  ];
  return <TabsRouter {...{ tabs, ...props }} />;
};

export default Tabs;
