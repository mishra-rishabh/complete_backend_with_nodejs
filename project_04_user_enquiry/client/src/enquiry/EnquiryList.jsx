import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const EnquiryList = ({ data, getAllEnquiry, setFormData }) => {
    let deleteRow = (enquiryId) => {
        axios.delete(`http://localhost:8000/api/website/enquiry/delete/${enquiryId}`)
        .then(() => {
            toast.success("Enquiry deleted successfully");
            getAllEnquiry();
        })
    };

    let editRow = (itemId) => {
        axios.get(`http://localhost:8000/api/website/enquiry/view-by-id/${itemId}`)
        .then((res) => {
            let enquiryData = res.data.enquiry;
            console.log(enquiryData);
            setFormData(enquiryData);
        });
    }
    return (
        <div className='bg-gray-200 p-4'>
            <ToastContainer />
            <h2 className='text-[20px] font-bold mb-4'>Enquiry List</h2>

            <div className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>S.no.</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Mobile no.</TableHeadCell>
                            <TableHeadCell>Message</TableHeadCell>
                            <TableHeadCell>
                                <span className="">Edit</span>
                            </TableHeadCell>
                            <TableHeadCell>
                                <span className="">Delete</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y">
                        {
                            data.length >= 1 ?
                                data.map((item, index) => {
                                    return (
                                        <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.mobile}</TableCell>
                                            <TableCell>{item.message}</TableCell>
                                            <TableCell>
                                                <button onClick={() => editRow(item._id)} className='bg-blue-500 text-white px-5 py-2 rounded-md'>Edit</button>
                                            </TableCell>
                                            <TableCell>
                                                <button onClick={() => deleteRow(item._id)} className='bg-red-500 text-white px-5 py-2 rounded-md'>Delete</button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                :
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell colSpan={7} className='text-center'>No data found!</TableCell>
                                </TableRow>
                        }
                        {/* <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                1
                            </TableCell>
                            <TableCell>Naveen</TableCell>
                            <TableCell>naveen@gmail.com</TableCell>
                            <TableCell>9898989898</TableCell>
                            <TableCell>hello brother</TableCell>
                            <TableCell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                            </TableCell>
                            <TableCell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Delete
                                </a>
                            </TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default EnquiryList