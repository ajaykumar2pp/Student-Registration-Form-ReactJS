import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import './StudentAdd.css';
import { validationSchema } from './StudentSchema';

const StudentAdd = ({ show, handleClose, onSubmit }) => {
  
    const { handleChange, handleSubmit, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            studentName: '',
            date: '',
            gender: '',
            fatherName: '',
            motherName: '',
            email: '',
            phone: '',
            address: '',

        },
        validationSchema,
        onSubmit: (values, action) => {
            console.log(values);
            // console.log(values.studentName);
            // console.log(values.date);
            // console.log(values.gender);
            // console.log(values.fatherName);
            // console.log(values.motherName);
            // console.log(values.email);
            // console.log(values.phone);
            // console.log(values.address);
            // Update studentData state with form values
          
           
            onSubmit(values);
            action.resetForm();
            handleClose();
        },
    });



    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Student Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="studentName">
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

                    <Form.Group controlId="date">
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

                    <Form.Group controlId="gender">
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
                    {/* Father Name */}
                    <Form.Group controlId="fatherName">
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
                    <Form.Group controlId="motherName">
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
                    {/* ******* Email Id **** */}
                    <Form.Group controlId="emailId">
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
                    <Form.Group controlId="phone">
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
                    {/**************  Address ******* */}
                    <Form.Group controlId="phone">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
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

