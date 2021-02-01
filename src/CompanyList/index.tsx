import React, { useEffect } from 'react';
import companyService from '../Services/company'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const CompanyList = () => {

    const [companies, setCompanies]: any = React.useState([])
    const [check, setCheck] = React.useState<any>('')

    const service = companyService()

    const handleIndexDelete = (index: any) => {
        setCheck(index)

    }
    //delete company by id
    const handleDelete = () => {
        let _companies = [...companies]
        console.log(_companies[check])
        //calling API service for delete 
        service.deleteCompany(_companies[check])
        handleEmployee()

    }

    const handleEmployee = async () => {
        try {
            let response = await service.getCompany()
            setCompanies(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    // get company
    useEffect(() => {
        async function getData() {
            try {
                let response = await service.getCompany() //api service for getting all companies
                setCompanies(response)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    }, []);

    return (
        <div>
            <h1 style={{ marginLeft: '5%', marginTop: 10, float: 'left' }}> Companies List </h1>
            <Button variant="danger" style={styles.delete} onClick={() => handleDelete()}> Delete</Button>
            <div style={{ marginTop: 50 }}>
                <Table striped bordered hover size="sm" style={{ margin: 50, width: '80%' }} >
                    <thead >
                        <tr>
                            <td>
                                <Form.Check type="checkbox" checked={false} />
                            </td>
                            <th style={{ borderBottom: '1px solid #ccc', backgroundColor: '#ccc' }}>Sr. Number</th>
                            <th style={{ borderBottom: '1px solid #ccc', backgroundColor: '#ccc' }}>Company Name</th>
                            <th style={{ borderBottom: '1px solid #ccc', backgroundColor: '#ccc' }}>Logo</th>
                            <th style={{ borderBottom: '1px solid #ccc', backgroundColor: '#ccc' }}>Website</th>
                            <th style={{ borderBottom: '1px solid #ccc', backgroundColor: '#ccc' }}>Email</th>
                        </tr>
                    </thead>

                    {companies.map((row: any, index: any) =>

                        <tbody id={index + 1} >
                            <tr>
                                <td>
                                    <Form.Check type="checkbox" onClick={() => handleIndexDelete(index)} />
                                </td>
                                <td>{index + 1}</td>
                                <td>{row.name}</td>
                                <td>
                             
                                    <img
                                        style={{ height: 30, width: 30 }}
                                        src={(row.logo || "")}
                                        className="d-inline-block align-top"
                                        alt="img"
                                        img-src="blob"
                                    />
                                   
                                </td>
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

const styles = {

    delete: { float: 'right' as 'right', marginRight: '17%' },
    buttons: { marginRight: '45%', marginBottom: 5 }

} 