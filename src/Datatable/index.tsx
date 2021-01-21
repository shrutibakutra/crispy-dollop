import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import employeeService from '../Services/employee'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const Datatable = () => {
    const service = employeeService()

    const [emloyees, setEmployees]: any = React.useState([])

    useEffect(() => {
        async function getData() {
            try {
                let response = await service.getAllEmployee()
                // console.log("response", response)
                setEmployees(response)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    }, []);


    return (
        <div>
            <div style={{width:'100%'}}>
            <h1 style={{margin:20}}>Companies and Employees</h1>
            <Link to="/companies">
            <button style={{float:'right',marginRight:30,marginBottom:10}}>Go to Companies</button>
            </Link>
            </div>
            <div style={{margin:30}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{borderBottom:'1px solid #ccc'}}>company Name</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>#</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>First Name</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>Last Name</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>Email</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>Phone</th>
                        </tr>
                    </thead>
                    {emloyees.map((row: any,index:any) =>           
                        <tbody >         
                            <tr>                        
                                <td>{row.companyDetail[0]?row.companyDetail[0].name:''}</td>
                                <td>{index+1}</td>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.email}</td>
                                <td>{row.phone}</td>
                            </tr>
                        </tbody>
                    
                    )}

                </Table>
            </div>
        </div>
    )
}

export default Datatable;