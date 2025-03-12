// src/components/contact.jsx

import React, { useState, useEffect } from "react";
import { getUsers, updateUser, deleteUser } from "../api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Contact() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({ NAME: "", EMAIL: "", PASSWORDHASH: "" });
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user.ID);
    setEditedData({ NAME: user.NAME, EMAIL: user.EMAIL, PASSWORDHASH: "" });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditedData({ NAME: "", EMAIL: "", PASSWORDHASH: "" });
  };

  const handleSave = async () => {
    if (!editedData.NAME || !editedData.EMAIL) {
      alert("El nombre y correo son obligatorios.");
      return;
    }

    const updatedUser = { ...editedData };
    if (!updatedUser.PASSWORDHASH) {
      delete updatedUser.PASSWORDHASH;
    }

    const response = await updateUser(editingUser, updatedUser);
    if (response) {
      setUsers(users.map(user => (user.ID === editingUser ? { ...user, ...updatedUser } : user)));
      setEditingUser(null);
      setEditedData({ NAME: "", EMAIL: "", PASSWORDHASH: "" });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    const response = await deleteUser(id);
    if (response) {
      setUsers(users.filter(user => user.ID !== id));
    } else {
      alert("Error al eliminar el usuario.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Usuarios
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Contraseña</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.ID}>
                    {editingUser === user.ID ? (
                      <>
                        <TableCell>
                          <TextField
                            value={editedData.NAME}
                            onChange={(e) => setEditedData({ ...editedData, NAME: e.target.value })}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={editedData.EMAIL}
                            onChange={(e) => setEditedData({ ...editedData, EMAIL: e.target.value })}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type={showPassword ? "text" : "password"}
                            placeholder="Nueva contraseña"
                            value={editedData.PASSWORDHASH}
                            onChange={(e) => setEditedData({ ...editedData, PASSWORDHASH: e.target.value })}
                          />
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Button variant="contained" color="success" onClick={handleSave}>Guardar</Button>
                          <Button variant="contained" color="error" onClick={handleCancel} sx={{ ml: 1 }}>Cancelar</Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{user.NAME}</TableCell>
                        <TableCell>{user.EMAIL}</TableCell>
                        <TableCell>*******</TableCell> {/* No mostramos la contraseña */}
                        <TableCell>
                          <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>Editar</Button>
                          <Button variant="contained" color="error" onClick={() => handleDelete(user.ID)} sx={{ ml: 1 }}>Eliminar</Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No hay usuarios disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
