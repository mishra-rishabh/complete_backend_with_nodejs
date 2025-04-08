let express = require("express");
const { enquiryInsert, enquiryList, enquiryDelete, enquiryById, enquiryUpdate } = require("../../controllers/web/enquiry.controller.js");

let enquiryRouter = express.Router();

enquiryRouter.post("/insert", enquiryInsert);
enquiryRouter.get("/view", enquiryList);
enquiryRouter.delete("/delete/:id", enquiryDelete);
enquiryRouter.get("/view-by-id/:id", enquiryById);
enquiryRouter.put("/update/:id", enquiryUpdate);

module.exports = enquiryRouter;