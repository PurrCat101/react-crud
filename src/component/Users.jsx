import { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import ButtonGroup from "@mui/material/ButtonGroup";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserGet();
  }, []);

  function UserGet() {
    axios.get("https://www.melivecode.com/api/users").then(function (response) {
      setUsers(response.data);
    });
  }

  function UserUpdate(id) {
    window.location.href = "/update/" + id;
  }

  function UserDelete(id) {
    const config = {
      method: "delete",
      url: "https://www.melivecode.com/api/users/delete",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: id,
      },
    };

    axios(config)
      .then((response) => response.data)
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          UserGet();
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: "flex", paddingBottom: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">User</Typography>
            </Box>
            <Box>
              <Link href="create">
                <Button variant="contained" disableRipple>
                  Create
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar alt={user.username} src={user.avatar} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">{user.fname}</TableCell>
                    <TableCell align="center">{user.lname}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button onClick={() => UserUpdate(user.id)}>
                          Edit
                        </Button>
                        <Button onClick={() => UserDelete(user.id)}>Del</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}

export default Users;
