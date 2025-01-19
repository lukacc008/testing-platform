import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  { id: "username", numeric: false, disablePadding: false, label: "Username" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "testId", numeric: false, disablePadding: false, label: "Test ID" },
  {
    id: "correctAnswersShare",
    numeric: true,
    disablePadding: false,
    label: "Correct Answers",
  },
  {
    id: "skippedAnswersShare",
    numeric: true,
    disablePadding: false,
    label: "Skipped Answers",
  },
  {
    id: "wrongAnswersShare",
    numeric: true,
    disablePadding: false,
    label: "Wrong Answers",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
  { id: "actions", numeric: false, disablePadding: false, label: "Delete" }, // Delete button column
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              textAlign:
                headCell.id === "createdAt"
                  ? "center"
                  : headCell.numeric
                  ? "right"
                  : "left", // Center horizontally
              verticalAlign: "middle", // Center vertically
            }}
          >
            {headCell.id !== "actions" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label // Plain label for actions column
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
