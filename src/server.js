require("express-async-errors");
const AppError = require("./utils/AppError");
const express = require('express');

const portServer = process.env.PORT || 3000;

const app = express();
const routes = (require("./routes/index"));


app.use(express.json());
app.use(routes);

app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

app.listen(portServer, () => {
    console.log('[SERVER] 🚀 Back-end started!')
});