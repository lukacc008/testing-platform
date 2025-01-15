import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import LoadingIndicator from "../table/LoadingIndicator";
import ToolbarComponent from "../table/Toolbar";
import EnhancedTableHead from "../table/EnhancedTableHead";
import TableRowComponent from "../table/TableRowComponent";

function UserTable() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("_id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Hardcoded BASE_URL TEMPORARY SOLUTION!!!
  const BASE_URL = "https://testing-platform-xzzf.onrender.com";

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/test-results`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/test-results/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Update local state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const sortedRows = React.useMemo(
    () =>
      [...users]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [users, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 3 }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <ToolbarComponent />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small" // Always use dense padding
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {sortedRows.map((row) => (
                  <TableRowComponent
                    key={row._id}
                    row={row}
                    onDelete={handleDelete} // Pass delete handler
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
}

export default UserTable;
