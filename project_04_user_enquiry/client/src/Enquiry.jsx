import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import EnquiryList from './enquiry/EnquiryList';

const Enquiry = () => {
    let [enquiryList, setEnquiryList] = useState([]);
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: ""
    });

    let saveEnquiry = (e) => {
        e.preventDefault();

        if (formData._id) {
            axios.put(`http://localhost:8000/api/website/enquiry/update/${formData._id}`, formData)
            .then((res) => {
                console.log(res.data);
                
                toast.success("Enquiry updated sucessfully");
                
                setFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    message: ""
                });

                getAllEnquiry();
            });
        } else {
            /* let formData = {
                sName: e.target.name.value,
                sEmail: e.target.email.value,
                sMobile: e.target.mobile.value,
                sMessage: e.target.message.value,

            }; */

            axios.post("http://localhost:8000/api/website/enquiry/insert", formData)
                .then((res) => {
                    console.log(res.data);
                    toast.success("Enquiry saved successfully")
                    setFormData({
                        name: "",
                        email: "",
                        mobile: "",
                        message: "",
                        _id: ""
                    });

                    getAllEnquiry();
                });
        }


    };

    let getAllEnquiry = () => {
        axios.get("http://localhost:8000/api/website/enquiry/view")
            .then((res) => {
                return res.data;
            })
            .then((finalData) => {
                if (finalData.status) {
                    setEnquiryList(finalData.enquiryList);
                }
            });
    };

    let getValue = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let oldData = { ...formData };

        oldData[inputName] = inputValue;
        setFormData(oldData);
    };

    useEffect(() => {
        getAllEnquiry();

    }, []);

    return (
        <div>
            <ToastContainer />
            <h1 className='text-[40px] text-center py-6 font-bold'>User Enquiry</h1>

            <div className='grid grid-cols-[30%_auto] gap-10'>
                <div className='bg-gray-200 p-4'>
                    <h2 className='text-[20px] font-bold'>Enquiry Form</h2>

                    <form action="" onSubmit={saveEnquiry}>
                        <div className='py-3'>
                            <Label htmlFor='name' value="Your Name" />Your Name
                            <TextInput type='text' name='name' value={formData.name} onChange={getValue} placeholder='Enter Your Name' required />
                        </div>

                        <div className='py-3'>
                            <Label htmlFor='email' value="Your Email" />Your Email
                            <TextInput type='email' name='email' value={formData.email} onChange={getValue} placeholder='Enter Your Email' required />
                        </div>

                        <div className='py-3'>
                            <Label htmlFor='mobile' value="Your Mobile Number" />Your Mobile Number
                            <TextInput type='text' name='mobile' value={formData.mobile} onChange={getValue} placeholder='Enter Your Mobile Number' required />
                        </div>

                        <div className='py-3'>
                            <Label htmlFor='message' value="Your Message" />Your Message
                            <Textarea name='message' value={formData.message} onChange={getValue} placeholder='Enter Your Message...' required rows={4} />
                        </div>

                        <div className='py-3'>
                            <Button type='submit' className='w-[100%]'>
                                {formData._id ? "Update" : "Save"}
                            </Button>
                        </div>
                    </form>
                </div>

                <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} setFormData={setFormData} />

            </div>
        </div>
    )
}

export default Enquiry