// src/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");

const userRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const options = {
    definition: swaggerDocument,
    apis: ["./routes/*.js"], 
};
const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/users", userRoutes);
app.use("/login", loginRoutes); 

// Basic route for the root
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de restapi. Visita /api-docs para la documentación.");
});

// Connect to the database and start the server
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
    });
}).catch(err => {
    console.error("No se pudo conectar a la base de datos", err);
});
