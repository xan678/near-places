import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
const port = 5000;

const password  = "sM02QQEmRX7A8Crv"
const databaseName = "tourdb"

const app = express();

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);
app.use("/tours", tourRouter);
const MONGODB_URL = `mongodb+srv://bruhomic:${password}@cluster0.cqppjzq.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URL).then(() => {
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    })
}).catch((error) => {
    console.log(`${error} : Server did not connect`);
});


// mongoose(MONGODB_URL).then(() => {
//     app.listen(port, () => {
//         console.log(`Server running on ${port}`);
//     })
// }).catch((error) => {
//     console.log(`${error} : Server did not connect`);
// });
