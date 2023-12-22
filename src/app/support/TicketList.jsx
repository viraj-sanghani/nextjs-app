"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import DataLoading from "@/components/DataLoading";
import { call, getTickets } from "@/services/api";
import { setAuthModel } from "@/redux/reducers/authReducer";

const columns = [
  { key: "ticketId", label: "#Ticket Id", minWidth: 100 },
  { key: "subject", label: "Subject", minWidth: 200 },
  { key: "issue", label: "Issue", minWidth: 300 },
  { key: "name", label: "Name", minWidth: 150 },
  { key: "email", label: "Email", minWidth: 200 },
  { key: "createdAt", label: "Created on", minWidth: 140 },
  { key: "status", label: "Status", minWidth: 130 },
];

const status = {
  Pending: "#B70404",
  "In Progress": "#FFA500",
  "On Hold": "#FFD700",
  Resolved: "#008000",
  Closed: "#808080",
};

function TicketList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const { isVerify, isLoggedIn } = useSelector((state) => state.auth);
  const loading = false;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const res = await call(getTickets());
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isLoggedIn && fetchData();
  }, [isLoggedIn]);

  return !isVerify ? (
    <DataLoading />
  ) : isLoggedIn ? (
    <div>
      <div className="page-title">
        <h1>Your Tickets</h1>
      </div>
      <div className="max-width page-content">
        <div className="new-ticket-btn">
          <Link href="/support/new">
            <Button variant="contained" size="large">
              Create New Ticket
            </Button>
          </Link>
        </div>
        {loading ? (
          <DataLoading />
        ) : (
          <div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.key}
                          style={{ minWidth: column.minWidth }}
                        >
                          <b>{column.label}</b>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            <TableCell>
                              <b>{row.ticketId}</b>
                            </TableCell>
                            <TableCell>{row.subject}</TableCell>
                            <TableCell>
                              <span
                                dangerouslySetInnerHTML={{ __html: row.issue }}
                              />
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                              {moment(row.createdAt).format("LLL")}
                            </TableCell>
                            <TableCell>
                              <Button
                                style={{
                                  color: status[row.status],
                                  fontWeight: "600",
                                }}
                                size="small"
                              >
                                {row.status}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div
      style={{
        height: 500,
        display: "flex",
        alignItems: "center",
        padding: "50px 0",
        background: "var(--color-4)",
      }}
    >
      <div className="login-mes-wrap">
        <div className="login-mes-box">
          <h3>Login or register to view or create tickets</h3>
          {/* <Link
            to={{
              pathname: "/auth/login",
              state: { redirect: location.pathname },
            }}
          >
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Link> */}
          {
            <a onClick={() => dispatch(setAuthModel("login"))}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </a>
          }
        </div>
      </div>
    </div>
  );
}

export default TicketList;
