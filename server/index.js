const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect("mongodb+srv://abhyuday7176:abhyuday@courses.u22wbxv.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('MongoDB connection successful');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.listen(3000,() => {
    console.log("Server Running on port 3000");
});
