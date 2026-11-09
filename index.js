import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

const sql = mysql2.createPool({
    host: process.env.HOST_BANCO,
    user: process.env.USUARIO_BANCO,
    password: process.env.SENHA_BANCO,
    database: process.env.NOME_BANCO
})

app.get("/", (request, response) => {
    const comando = "SELECT * FROM musicas_mariaisa"
    sql.query(comando, (error, data) => {
        if (error) {
            console.error(error);
            response.status(500).json({ error: "Erro ao buscar músicas" });
        } else {
            response.json(data);
        }
    });
});

app.listen(3000, () => {
console.log("Servidor online!")
})

export default app
