import React, { useEffect } from 'react';
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import companyService from '../Services/company'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CompanyList from '../CompanyList/index'
import { withRouter } from 'react-router-dom';


const Company = (props: any, { history, match }: any) => {
    // console.log("****")
    const { id } = props.match.params;

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            logo: '',
            websitelink: ''

        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            createCompany(values)
        },

    });

    const service = companyService()

    //create company
    const createCompany = async (values: any) => {
        try {
            let _data = {
                name: values.name,
                email: values.email,
                logo: values.logo,
                websitelink: values.websitelink
            }
            await service.createCompany(_data)
            handlePassData()

        } catch (error) {
            console.log(error)
        }
    }

    //passing companyId to create new employee 
    const handlePassData = async () => {
        let response = await service.getCompany()
        let companyId = response[response.length - 1]._id
        props.history.push('/employees', { companyId: companyId }) //passes companyId to employee component
    }

    const handleFileUpload = (event:any)=>{
        
    }



    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="App" style={{ marginLeft: '10%' }}>
                    <h1>Company Form</h1>
                    <div style={styles.fields}>
                        <span style={styles.text}>Company Name:</span>
                        <Form.Control name="name" type="companyName" style={styles.input} onChange={formik.handleChange} />
                    </div>
                    <div style={styles.fields}>
                        <span style={styles.text}>Email:</span>
                        <Form.Control name="email" type="email" style={styles.input} onChange={formik.handleChange} />
                    </div>

                    <div style={styles.fields}>
                        <span style={styles.text}>Logo:</span>
                        <Form.Control id="file" name="logo" type="file" style={styles.input} onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div style={styles.fields}>
                        <span style={styles.text}>Website:</span>
                        <Form.Control name="websitelink" type="website" style={styles.input} onChange={formik.handleChange} />
                    </div>
                    <Button
                        style={styles.button}
                        type="submit"
                        onClick={() => formik.handleSubmit}
                    >Add and Next</Button>

                    <Link to={'/employees'}>
                        <Button
                            style={styles.button}
                       
                        > Employees</Button>
                    </Link>
                </div>
            </form>
            <CompanyList />
        </div>

    )
}

export default withRouter(Company);

const styles = {
    fields: { height: '100%', width: '100%', marginBottom: '10px' },
    text: { marginRight: '10px' },
    input: { height: '100%', width: '20%' },
    button: { color: 'white', marginLeft: 10 }
}

