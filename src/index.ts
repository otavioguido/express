import express, { Express, Request, Response } from "express";
import { User } from "./interfaces/user";
const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  database: "user",
  password: "password",
  port: 5432,
});
const app: Express = express();
const port = 3000;

app
  .route("/users/:id")
  .get((req: Request, res: Response) => {
    res.send("Got user");
  })
  .put((req: Request, res: Response) => {
    res.send("Updated user");
  })
  .delete((req: Request, res: Response) => {
    res.send("Deleted user");
  });

app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, results: User) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
