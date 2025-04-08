let enquiryModel = require("../../models/enquiry.models.js");

let enquiryInsert = (req, res) => {
    let { name, email, mobile, message } = req.body;

    let enquiry = new enquiryModel({
        name: name,
        email: email,
        mobile: mobile,
        message: message
    });

    enquiry.save().then(() => {
        res.send({
            status: 1,
            message: "Enquiry saved successfully"
        })
    }).catch((err) => {
        res.send({
            status: 0,
            message: "Error while saving enquiry!",
            error: err
        })
    })
};

let enquiryList = async (req, res) => {
    let enquiry = await enquiryModel.find();
    res.send({
        status: 1,
        enquiryList: enquiry
    })
};

let enquiryDelete = async (req, res) => {
    let enquiryId = req.params.id;

    let enquiry = await enquiryModel.deleteOne({_id: enquiryId});

    res.send({
        status: 1,
        message: "Enquiry deleted successfully",
        enquiry: enquiry
    });
};

let enquiryById = async (req, res) => {
    let enquiryId = req.params.id;

    let enquiry = await enquiryModel.findOne({_id: enquiryId});

    res.send({
        status: 1,
        enquiry: enquiry
    })
};

let enquiryUpdate = async (req, res) => {
    let enquiryId = req.params.id;
    let { name, email, mobile, message } = req.body;

    let updateObj = {
        name,
        email,
        mobile,
        message
    };

    let updateResponse = await enquiryModel.updateOne({_id: enquiryId}, updateObj);

    res.send({
        status: 1,
        message: "Enquiry updated successfully",
        updateResponse
    })
};

module.exports = {
    enquiryInsert,
    enquiryList,
    enquiryDelete,
    enquiryById,
    enquiryUpdate
}