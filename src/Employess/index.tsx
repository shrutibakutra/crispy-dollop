import React, { useEffect, useState } from 'react';
import employeeService from '../Services/employee'
import companyService from '../Services/company'
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const Employees = (props: any) => {

    //get companyId from companies component
    let companyId = props.history.location.state

    const [employees, setEployees] = useState<any>([])
    const [edit, setEdit] = useState(false)
    const [updatedEmply, setToUpdateEmply] = useState<any>({})
    const [companies, setCompanies] = useState<any>([])
    const [ check, setCheck] = useState<any>('')
    const [ checked, setChecked]=useState<any>(false)


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: ''
        },
        onSubmit: values => {
            createEmployee(values)
        },


    });
    const service = employeeService()
    const company_Service = companyService()

    // get all employess
    useEffect(() => {
        async function getData() {
            try {
                let employees = await service.getAllEmployee()
                setEployees(employees)
                let companies = await company_Service.getCompany()
                setCompanies(companies)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    }, []);

    //create employee
    const createEmployee = async (values: any) => {

        //get company id usinf dropdown value
        let data = [...companies]
        let co_id = ''
        data.forEach(element => {
            if (element.name == values.company) {
                co_id = element._id
            } else {

            }
        });

        try {
            let _data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                companyId: co_id
            }
            await service.createEmployee(_data) //API service for creating new employee
            handleCreateEmployee()

        } catch (error) {
            console.log(error)
        }
    }

    //handling changes in employees state
    const handleCreateEmployee = async () => {
        try {
            let response = await service.getAllEmployee()
            setEployees(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleIndexDelete =(index:any) =>{
        setCheck(index)
        setChecked(true)
       
    }

    //delete employee by Id
    const handleDelete = () => {
        let _employees = [...employees]
        service.deleteEmployee(_employees[check])
        handleCreateEmployee()
        setChecked(false)

    }


    //Update anything about employee (1/3)
    const handleChange = async () => {
        let _employees = [...employees]
        let index: any = _employees[check]
        console.log(index.firstName)
        setEdit(true)
        setToUpdateEmply({
            firstName: index.firstName,
            lastName: index.lastName,
            email: index.email,
            phone: index.phone,
            id: index._id
        })
    }

    //Update anything about employee (2/3)
    const updateEmployee = async () => {
        setEdit(false)
        await service.updateEmployee(updatedEmply)
        handleCreateEmployee()

    }

    //Update anything about employee (3/3)
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setToUpdateEmply({ ...updatedEmply, [name]: value });
    };



    return (
        <div style={{ marginLeft: '50px' }} className="App">
            <h1>Employees List</h1>
            {edit ? (<div>
                <form onSubmit={updateEmployee}>

                    <div style={styles.fields}>
                        <span style={styles.text}>First Name:</span>
                        <Form.Control name="firstName"
                            type="firstname"
                            style={styles.input}
                            value={updatedEmply.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={styles.fields}>
                        <span style={styles.text}>Last Name:</span>
                        <Form.Control
                            name="lastName"
                            type="lastname"
                            style={styles.input}
                            value={updatedEmply.lastName}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div style={styles.fields}>
                        <span style={styles.text}>Email:</span>
                        <Form.Control
                            name="email"
                            type="email"
                            style={styles.input}
                            value={updatedEmply.email}
                            onChange={handleInputChange}

                        />
                    </div>

                    <div style={styles.fields}>
                        <span style={styles.text}>Phone:</span>
                        <Form.Control
                            name="phone"
                            type="phone"
                            style={styles.input}
                            value={updatedEmply.phone}
                            onChange={handleInputChange}

                        />
                    </div>
                    <button style={styles.button} type="submit">Update</button>
                </form>
            </div>) :
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <span style={styles.text}>Select Company:</span>
                            <Form.Control as="select"
                                name="company"
                                type="company"
                                onChange={formik.handleChange}
                                value={formik.values.company}
                                style={styles.input}>
                                {companies.map((com: any) => (

                                    <option>{com.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div style={styles.fields}>
                        <span style={styles.text}>First Name:</span>
                        <Form.Control name="firstName"
                            type="firstname"
                            style={styles.input}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div style={styles.fields}>
                        <span style={styles.text}>Last Name:</span>
                        <Form.Control
                            name="lastName"
                            type="lastname"
                            style={styles.input}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}

                        />
                    </div>
                    <div style={styles.fields}>
                        <span style={styles.text}>Email:</span>
                        <Form.Control
                            name="email"
                            type="email"
                            style={styles.input}
                            value={formik.values.email}
                            onChange={formik.handleChange}

                        />
                    </div>

                    <div style={styles.fields}>
                        <span style={styles.text}>Phone:</span>
                        <Form.Control
                            name="phone"
                            type="phone"
                            style={styles.input}
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <Button variant="success" style={styles.button} type="submit">Submit</Button>
                </form>

            }

            <div>
                <div style={styles.buttons}>
                <Button variant="warning" style={styles.update} onClick={() => handleChange()}> Update</Button>
                    <Button variant="danger" style={styles.delete} onClick={() => handleDelete()}> Delete</Button>
                </div>
                <Table striped bordered hover style={{ width: '50%', marginTop: '50px' }}>
                    <thead style={{ width: '50%' }}>
                        <tr style={{ width: '50%' }}>

                            <th><Form.Check type="checkbox" /> </th>
                            <th style={{ borderBottom: '1px solid #ccc' }}>company Name</th>
                            <th style={{ borderBottom: '1px solid #ccc' }}>#</th>
                            <th style={{ borderBottom: '1px solid #ccc' }}>First Name</th>
                            <th style={{ borderBottom: '1px solid #ccc' }}>Last Name</th>
                            <th style={{ borderBottom: '1px solid #ccc' }}>Email</th>
                            <th style={{ borderBottom: '1px solid #ccc' }}>Phone</th>
                        </tr>
                    </thead>
                    {employees ? employees.map((row: any, index: any) =>
                        <tbody >
                            <tr >
                                <td>
                                    <Form.Check type="checkbox"  onClick={()=>handleIndexDelete(index)} />
                                </td>
                                <td>{row.companyDetail[0] ? row.companyDetail[0].name : 'apple'}</td>
                                <td>{index + 1}</td>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.email}</td>
                                <td>{row.phone}</td>
                            </tr>
                        </tbody>
                    ) : <div style={{ justifyContent: 'center' }}>
                            No data to show :(
                        </div>}
                </Table>
            </div>

        </div>
    )
}

export default Employees;

const styles = {
    fields: { height: '100%', width: '100%', marginBottom: '10px' },
    text: { marginRight: '10px' },
    input: { height: '100%', width: '20%' },
    button: { height: '100%', width: '20%' },
    update: { float: 'right' as 'right' },
    delete: { float: 'left' as 'left'},
    buttons: { width: '200px', float: 'right' as 'right', marginRight: '50%', marginBottom: 10 },
} 