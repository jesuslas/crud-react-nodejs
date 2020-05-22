import React from "react";
//containers
import DasboardContainer from "./Dashbord";
import FacturationContainer from "./facturation";
import MyTicketsContainer from "./MyTickets";
import LogoutContainer from "./Logout";

export const Dashboard = () => <DasboardContainer />;
export const Facturation = () => <FacturationContainer />;
export const MyTickets = () => <MyTicketsContainer />;
export const Logout = () => <LogoutContainer />;
