import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { withRouter } from "react-router-dom";
import {
  customBodyRender,
  renderSelectUser,
  renderSelectTicketName,
  renderSelectStatus
} from "../components/table/cellCustomRenders";
import {
  addTickets,
  deleteTickets,
  getAllUsers,
  updateTicket,
  getAllTickets
} from "../service/api.service";

const MyTickets = props => {
  const {
    user: {
      user_types: { name: role },
      id
    }
  } = props || {};
  const { userId, tick, setTick, isAdmin } = props;
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [editCellRow, setEditCellRow] = useState({
    cell: null,
    row: null
  });
  console.log('editCellRow',editCellRow);
  const options = {
    display: false
  };
  const columns = [
    {
      name: "ticket Id",
      options: {
        display: true
      }
    },
    {
      name: "userId",
      options
    },
    {
      name: "Assigned to",
      options: {
        customBodyRender:
          isAdmin &&
          customBodyRender(renderSelectUser, {
            users,
            tick,
            setTick,
            editCellRow,
            setEditCellRow,
            edit: updateTicket,
            colunm: "userId"
          })
      }
    },
    {
      name: "Ticket",
      options: {
        customBodyRender:
          isAdmin &&
          customBodyRender(renderSelectTicketName, {
            users,
            tick,
            setTick,
            editCellRow,
            setEditCellRow,
            edit: updateTicket,
            colunm: "ticket_pedido"
          })
      }
    },
    {
      name: "Created At",
      options: {
        customBodyRender: value => moment(value).format("LL [Time:] HH:mm")
      }
    },
    {
      name: "Status",
      options: {
        customBodyRender:
          customBodyRender(renderSelectStatus, {
            tick,
            setTick,
            editCellRow,
            setEditCellRow,
            edit: updateTicket,
            colunm: "status"
          })
      }
    }
  ];
  const data = (tickets || []).map(
    ({
      user: { id: userId, name: userName },
      id: ticketid,
      ticket_pedido,
      created_at,
      status
    }) => [ticketid, userId, userName, ticket_pedido, created_at, status]
  );

  const classes = useStyles();
  const Toolbar = () => {
    return (
      <p>
        {isAdmin && (
          <Tooltip title="Create Ticket">
            <Icon
              className={classes.icon}
              color="primary"
              onClick={async () => {
                await addTickets({}, userId);
                setTick(tick + 1);
              }}
            >
              add_circle
            </Icon>
          </Tooltip>
        )}
        <Tooltip title="Logout">
          <Icon
            className={classes.icon}
            color="primary"
            onClick={() => props.history.push(`/logout`)}
          >
            exit_to_app
          </Icon>
        </Tooltip>
      </p>
    );
  };
  const settings = {
    responsive: "stacked",
    filter: false,
    print: false,
    viewColumns: false,
    download: false,
    pagination: false,
    onCellClick: (_, { colIndex, rowIndex }) => {
      setEditCellRow({ cell: colIndex, row: rowIndex });
    },
    customToolbar: () => <Toolbar />,
    search: false,
    onRowsDelete: ({ data }) => {
      let ticketsIds = [];
      data.forEach(({ index }) => {
        ticketsIds = [...ticketsIds, tickets[index].id];
      });
      const results = ticketsIds.reduce(async (allPromise, tickect) => {
        const allResults = await allPromise;
        const result = await deleteTickets(tickect);
        return [...allResults, result];
      }, Promise.resolve([]));
      if (results.length === ticketsIds.length) {
        setTick(tick + 1);
      }
    }
  };
  const getData = async () => {
    try {
      const params = role !== "admin" ? id : "";
      const { data: ticks } = await getAllTickets(params);
      const { data } = await getAllUsers();
      setTickets(ticks);
      setUsers(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(
    () => {
      console.log('editCellRow',editCellRow);
      getData();
    },
    [editCellRow,tick]
  );
  return (
    <MUIDataTable
      title={"Tickets"}
      data={data}
      columns={columns}
      options={settings}
    />
  );
};
const useStyles = makeStyles(() => ({
  icon: {
    cursor: "pointer"
  }
}));
export default withRouter(MyTickets);
