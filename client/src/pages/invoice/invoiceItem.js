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
} from "../../components/table/cellCustomRenders";
import {
  addInvoicesItemTypes,
  deleteTickets,
  getModel,
  editModel,
  updateTicket,
  getAllTickets
} from "../../service/api.service";

const MyTickets = props => {
  const {
    user: {
      user_types: { name: role },
      id
    }
  } = props || {};
  const { userId, tick, setTick, isAdmin } = props;
  const [invoiceItemType, setInvoiceItemType] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [editCellRow, setEditCellRow] = useState({
    cell: null,
    row: null
  });
  const options = (show = true) =>({
    display: show
  });
  const columns = [
    {
      name: "Item Type Id",
      ...options()
    },
    {
        name: "Number",
        options: {
          customBodyRender: customBodyRender(renderSelectTicketName, {
            tick,
            setTick,
            editCellRow,
            setEditCellRow,
            edit: editModel("invoiceItemType"),
            colunm: "number"
          })
        }
      },
    {
        name: "Name",
        options: {
          customBodyRender: customBodyRender(renderSelectTicketName, {
            tick,
            setTick,
            editCellRow,
            setEditCellRow,
            edit: editModel("invoiceItemType"),
            colunm: "name"
          })
        }
      },
    {
        name: "Descrption",
        options: {
          customBodyRender: customBodyRender(renderSelectTicketName, {
            tick,
            setTick,
            editCellRow,
            setEditCellRow,
            edit: editModel("invoiceItemType"),
            colunm: "description"
          })
        }
      }
  ];

  const data = (invoiceItemType || []).map(
    ({
      id,
      number,
      name,
      description
    }) => [id, number, name, description]
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
                await addInvoicesItemTypes({}, userId);
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
      const { data } = await getModel("invoiceItemType");
      setTickets(ticks);
      setInvoiceItemType(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(
    () => {
      getData();
    },
    [editCellRow, tick]
  );
  return (
    <MUIDataTable
      title={"Invoice Item Types    "}
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
