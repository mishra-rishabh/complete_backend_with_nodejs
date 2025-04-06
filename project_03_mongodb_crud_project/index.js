let express = require("express");
let mongoose = require("mongoose");
let enquiryModel = require("./models/enquiry.js");

require("dotenv").config();

let app = express();

app.use(express.json());

app.post("/api/enquiry-insert", (req, res) => {
    let { sName, sEmail, sMobile, sMessage } = req.body;
    // console.log(sName, sEmail, sMobile, sMessage);
    let enquiry = new enquiryModel({
        name: sName,
        email: sEmail,
        mobile: sMobile,
        message: sMessage
    });
    
    enquiry.save().then(() => {
        res.send({
            status: 1,
            message: "Enquiry saved successfully"
        });
    }).catch((err) => {
        res.send({
            status: 0,
            message: "Enquiry while saving enquiry",
            error: err
        });
    });
});

app.get("/api/enquiry-list", async (req, res) => {
    let enquiryList = await enquiryModel.find();

    res.status(200).json({
        status: 1,
        message: "Enquiry List",
        data: enquiryList
    });
});

app.delete("/api/enquiry-delete/:id", async (req, res) => {
    let enquiryId = req.params.id;
    let deleteEnquiry = await enquiryModel.deleteOne({_id: enquiryId});

    res.send({
        status: 1,
        message: "Enquiry deleted successfully",
        id: enquiryId,
        delResponse: deleteEnquiry
    });
});

app.put("/api/enquiry-update/:id", async (req, res) => {
    let enquiryId = req.params.id;
    let { sName, sEmail, sMobile, sMessage } = req.body;
    
    let updateObj = {
        name: sName,
        email: sEmail,
        mobile: sMobile,
        message: sMessage
    };

    let updateResp = await enquiryModel.updateOne({_id: enquiryId}, updateObj);

    res.send({
        status: 1,
        message: "Enquiry updated successfully",
        id: enquiryId,
        updateResponse: updateResp
    });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected...");

    app.listen(process.env.PORT, () => {
        console.log("Server started at port ", process.env.PORT);
    });
});
