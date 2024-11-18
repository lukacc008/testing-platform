import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function TableRowComponent({ row }) {
  return (
    <TableRow hover tabIndex={-1} key={row._id}>
      <TableCell>{row.username}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.testId}</TableCell>
      <TableCell align="right">{`${row.correctAnswersShare} %`}</TableCell>
      <TableCell align="right">{`${row.skippedAnswersShare} %`}</TableCell>
      <TableCell align="right">{`${row.wrongAnswersShare} %`}</TableCell>
      <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
    </TableRow>
  );
}

export default TableRowComponent;