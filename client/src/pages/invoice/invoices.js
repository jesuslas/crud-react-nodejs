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
  addInvoices,
  deleteTickets,
  getModel,
  editModel,
  updateTicket,
  getAllTickets
} from "../../service/api.service";

const Invoices = props => {
  const {
    user: {
      user_types: { name: role },
      id
    }
  } = props || {};
  const { userId, tick, setTick, isAdmin } = props;
  const [invoices, setInvoices] = useState([]);
  const [editCellRow, setEditCellRow] = useState({
    cell: null,
    row: null
  });
  const options = (show = true) =>({
    display: show
  });
  const columns = [
    {
      name: "Id",
      ...options()
    },
    {
      name: "Name",
      options: {
        customBodyRender: customBodyRender(renderSelectTicketName, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: editModel("invoice"),
          colunm: "name"
        })
      }
    },
    {
      name: "Number",
      options: {
        customBodyRender: customBodyRender(renderSelectTicketName, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: editModel("invoice"),
          colunm: "number"
        })
      }
    },
    {
      name: "Description",
      options: {
        customBodyRender: customBodyRender(renderSelectTicketName, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: editModel("invoice"),
          colunm: "description"
        })
      }
    },
    {
      name: "Status",
      options: {
        customBodyRender: customBodyRender(renderSelectStatus, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: editModel("invoice"),
          colunm: "status"
        })
      }
    },
    {
      name: "Amount",
      options: {
        customBodyRender: customBodyRender(renderSelectTicketName, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: editModel("invoice"),
          colunm: "totalAmount"
        })
      }
    },
    {
      name: "Taxes",
      options: {
        customBodyRender: customBodyRender(renderSelectTicketName, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: editModel("invoice"),
          colunm: "taxes"
        })
      }
    },
    {
      name: "Created At",
      options: {
        customBodyRender: value => moment(value).format("LL [Time:] HH:mm")
      }
    },
  ];
  const data = (invoices || []).map(
    ({
      id,
      name,
      number,
      description,
      status,
      totalAmount,
      taxes,
      created_at,
      updated_at
    }) => [ 
      id,
      name,
      number,
      description,
      status,
      totalAmount,
      taxes,
      created_at,
      updated_at
    ]
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
                await addInvoices({}, userId);
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
        ticketsIds = [...ticketsIds, invoices[index].id];
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
      const { data } = await getModel("invoice");
      console.log('data',data);
      setInvoices(data);
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
      title={"Invoices"}
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
export default withRouter(Invoices);
