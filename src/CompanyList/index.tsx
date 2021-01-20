import React, { useEffect } from 'react';
import companyService from '../Services/company'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";

const CompanyList = () => {
  
    const [companies, setCompanies]: any = React.useState([])
    const service = companyService()

  
    //update company
    const updateCompany = async (values: any) => {
        try {
            let _data = {
                name: values.name,
                email: values.email,
                logo: values.logo,
                websitelink: values.websitelink
            }
            setTimeout(() => {
                window.location.reload()
            }, 2000)

            await service.updateCompany(_data)
        } catch (error) {
            console.error(error)
        }
    }


    const handleUpdate = async (data: any) => {

        let _companies = [...companies]
        let foundIndex = _companies.findIndex(x => x.id == data._id)
        _companies[foundIndex] = data
        setCompanies(_companies)
    }

    const handleDelete = (data: any) => {
        let _companies = [...companies]
        console.log(_companies[data])
        service.deleteCompany(_companies[data])
    }

    // get company
    useEffect(() => {
        async function getData() {
            try {
                let response = await service.getCompany()
                console.log("response", response)
                setCompanies(response)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    }, []);
    return (
        <div> 
            <h1 style={{marginLeft:50,margin:20}}> Companies List </h1>
        <div style={{padding:20}}>
            <Table striped bordered hover size="sm" style={{margin:20}} >
                <thead >
                    <tr>
                        <th style={{ borderBottom: '1px solid #ccc',backgroundColor:'#ccc'}}>Sr. Number</th>
                        <th style={{ borderBottom: '1px solid #ccc',backgroundColor:'#ccc' }}>Company Name</th>
                        <th style={{ borderBottom: '1px solid #ccc',backgroundColor:'#ccc' }}>Logo</th>
                        <th style={{ borderBottom: '1px solid #ccc' ,backgroundColor:'#ccc'}}>Website</th>
                        <th style={{ borderBottom: '1px solid #ccc',backgroundColor:'#ccc' }}>Email</th>
                    </tr>
                </thead>
             
                {companies.map((row: any, index: any) =>
                    <tbody id={index+1} >
                        <tr>
                            <td>{index + 1}</td>
                            <td>{row.name}</td>
                            <td>{row.logo}</td>
                            <td>{row.websitelink}</td>
                            <td>{row.email}</td>
                       
                        </tr>
                    </tbody>
                )}
            </Table>
        </div>
        </div>

    )
}

export default CompanyList;
