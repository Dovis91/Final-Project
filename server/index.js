//Pagrindiniai moduliai ir jų importas
import "dotenv/config";
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";

// Routų importas
import regRouter from "./routes/register.js";
import logRouter from "./routes/login.js";

// expresso ir porto užkūrimas
const app = express();
const PORT = process.env.PORT || 6000;

// Visi reikalingi modulių use'ai
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: false }));

// Routų panaudojimas
app.use("/register", regRouter);
app.use("/login", logRouter);

//Serveriuko paleidimas! 🖥
app.listen(PORT, console.log(`Serveris paleistas ant ${PORT} porto`));
