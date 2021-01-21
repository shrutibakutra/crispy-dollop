import React, { useEffect } from 'react';
import companyService from '../Services/company'
import Table from 'react-bootstrap/Table';


const CompanyList = () => {
  
    const [companies, setCompanies]: any = React.useState([])
    const service = companyService()

    //delete company by id
    const handleDelete = (data: any) => {
        let _companies = [...companies]
        console.log(_companies[data])
        //calling API service for delete 
        service.deleteCompany(_companies[data])
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
                            <button style={styles.delete} onClick={() => handleDelete(index)}> Delete</button>
                       
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
  
    delete: { backgroundColor: 'red', float: 'left' as 'left', borderRadius: '5px', marginTop: 10, marginLeft: 5 },

} 