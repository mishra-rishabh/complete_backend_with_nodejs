let express = require("express");

let app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({
        status: 1,
        message: "Home Page API"
    });
});

app.get("/news", (req, res) => {
    res.send({
        status: 1,
        message: "News Page API"
    });
});

// params is used for dynamic data, for eg. id param (here id could be anything)
app.get("/getParamsData/:id", (req, res) => {
    let currentId = req.params.id;

    res.send({
        status: 1,
        message: "Param id: " + currentId
    });
});

// body data
app.post("/getBodyData", (req, res) => {
    // console.log(req);

    // 1st method to send response
    /* res.send({
        status: 1,
        message: "body data api",
        bodyData: req.body
    }); */

     // 2nd method to send response
    res.status(200).json({
        status: 200,
        message: "body data api",
        bodyData: req.body
    });
});

// mostly used for searching. api ko url me bhej diya ki kya search krna hai and api search kr ke de rhi results hume
app.post("/getQueryData", (req, res) => {
    res.send({
        status: 1,
        message: "query params data api",
        queryData: req.query
    })
});

app.listen("8000");