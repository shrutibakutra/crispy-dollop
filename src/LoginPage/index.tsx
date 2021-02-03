import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import companyService from '../Services/company'
import { setFlagsFromString } from 'v8';


const LoginPage = (props: any) => {

    const [login, setLogin] = React.useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            passsword: ''

        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            loginUser(values)
        },

    });

    const service = companyService()

    const loginUser = async (values: any) => {
        try {
            let _data = {
                email: values.email,
                password: values.password
            }
             
            let response = await service.loginUser(_data);
            
           if (response.code==200){
            setLogin(true)
            props.history.push('/Datatable')

           }else{
            alert(JSON.stringify("Incorrect email or password"));
            
           }



        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h3>Login Here</h3>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" onChange={formik.handleChange} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={formik.handleChange} />
                </Form.Group>

                <Button type="submit" onClick={() => formik.handleSubmit} >Login</Button>
            </Form>
        </div>
    )



}
export default LoginPage;