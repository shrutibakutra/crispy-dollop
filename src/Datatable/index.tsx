import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import employeeService from '../Services/employee'
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <h1 style={{margin:20}}>Companies and Employees</h1>
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
                                <td>{row.companyDetail.name}</td>
                                <td>{index+1}</td>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.email}</td>
                                <td>{row.phone}</td>
                                <button> Update</button>
                                <button> Delete</button>
                             
                            </tr>
                        </tbody>
                    
                    )}

                </Table>
            </div>
        </div>
    )
}

export default Datatable;