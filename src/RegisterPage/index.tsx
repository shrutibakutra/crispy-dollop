import React from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import companyService from '../Services/company'


const RegisterPage = () => {



    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            passsword: ''

        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            createUser(values)
        },

    });

    const service = companyService()

    const createUser = async (values: any) => {

        try {
            let _data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            }

            await service.createUser(_data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h3>Register Here</h3>
            <form onSubmit={formik.handleSubmit}>
                <div >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" type="firstName" placeholder="First Name" onChange={formik.handleChange} />
                </div>
                <Form.Group >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" type="lastName" placeholder="Last Name" onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" placeholder="Enter email" onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={formik.handleChange} />
                </Form.Group>
                    <Button type="submit" onClick={() => formik.handleSubmit}>Register</Button>
                <div style={{float:'right',backgroundColor:'green'}}>
                 
                 <Link to="/login">
                 <Button onClick={() => formik.handleSubmit}>Go to Login</Button>
                </Link>
                </div>
            </form>
        </div>
    )



}
export default RegisterPage;