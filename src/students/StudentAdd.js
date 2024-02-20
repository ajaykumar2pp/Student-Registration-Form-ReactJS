import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import './StudentAdd.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validationSchema } from '../validation/StudentSchema';
import shortid  from "shortid"

const StudentAdd = ({ show, handleClose, onSubmit }) => {

  // Creating new unique id
  const studentId = shortid.generate()

    const { handleChange, handleSubmit, handleBlur, touched, values, errors,setFieldValue } = useFormik({
        initialValues: {
            studentName: '',
            date: '',
            gender: '',
            fatherName: '',
            motherName: '',
            email: '',
            phone: '',
            address: '',
            imageFile: null,

        },
        validationSchema,
        onSubmit: (values, action) => {
            console.log(values);
            // onSubmit(values);
            onSubmit({ id: studentId, ...values });
            toast.success("Student Add Successfully ");
            action.resetForm();
            handleClose();
        },
    });

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setFieldValue('imageFile', reader.result);
        };
        reader.readAsDataURL(file);
    };


    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Student Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <div className="d-flex justify-content-between">

                        {/* student name */}
                        <Form.Group controlId="studentName" className='mb-2'>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="studentName"
                                value={values.studentName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.studentName && errors.studentName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.studentName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* student dob */}
                        <Form.Group controlId="date" className='mb-2'>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={values.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.date && errors.date}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-between">
                        {/* Father Name */}
                        <Form.Group controlId="fatherName" className='mb-2'>
                            <Form.Label>Father Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fatherName"
                                value={values.fatherName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.fatherName && errors.fatherName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.fatherName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Mother Name */}
                        <Form.Group controlId="motherName" className='mb-2'>
                            <Form.Label>Mother Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="motherName"
                                value={values.motherName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.motherName && errors.motherName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.motherName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-between">

                        {/* ******* Email Id **** */}
                        <Form.Group controlId="emailId" className='mb-2'>
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/***  Phone Number  ********* */}
                        <Form.Group controlId="phone" className='mb-2'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="number"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.phone && errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </div>


                    <Form.Group controlId="gender" className='mb-2'>
                        <Form.Label>Gender</Form.Label>
                        <div className="radio-options">
                            <Form.Check
                                type="radio"
                                label="Male"
                                name="gender"
                                value="Male"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.gender && errors.gender}
                            />
                            <Form.Check
                                type="radio"
                                label="Female"
                                name="gender"
                                value="Female"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.gender && errors.gender}
                            />
                            <Form.Check
                                type="radio"
                                label="Transgender"
                                name="gender"
                                value="Transgender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.gender && errors.gender}
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            {errors.gender}
                        </Form.Control.Feedback>
                    </Form.Group>


                    {/**************  Address ******* */}
                    <Form.Group controlId="address" className='mb-2'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.address && errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* student image  */}
                    <Form.Group controlId="imageFile" className="mb-3" >
                        <Form.Label>Student Image Upload</Form.Label>
                        <Form.Control
                            type="file"
                            name="imageFile"
                            onChange={(event) => {
                                handleChange(event);
                                handleImageChange(event);
                            }}
                            isInvalid={touched.imageFile && errors.imageFile}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.imageFile}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default StudentAdd;

