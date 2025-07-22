import express from "express";
import cors from "cors";
import { router as TaskRouter } from "./src/routes/tasks.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/tasks", TaskRouter);

app.get("/", (req, res) => {
	res.send("Welcome to Pantauin API!");
});

app.use((req, res) => {
	res.send("<h1>Page not found!</h1>");
});

app.listen(3000, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
