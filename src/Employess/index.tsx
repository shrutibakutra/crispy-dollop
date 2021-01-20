import React,{useEffect,useState} from 'react';
import employeeService from '../Services/employee'
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import Table from 'react-bootstrap/Table';


const Employees = (props:any) => {

    let companyId = props.history.location.state

    const [ employees,setEployees]= useState<any>([])
    const [edit ,setEdit]=useState(false)
    const [ updatedEmply ,setToUpdateEmply]=useState<any>({})

    // console.log(employees[13])
    console.log(employees[13] ? employees[13].companyDetail[0].name : '')


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
   
        },
        onSubmit: values => {
            
          createEmployee(values)
           
        },
        
   
      });
    const service = employeeService()

      // get company
      useEffect(() => {
        async function getData() {
            try {
                let response = await service.getAllEmployee()
                setEployees(response)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    }, []);

    const createEmployee = async (values:any) => {
        console.log(values)
        try {
            let _data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                companyId:companyId.companyId
            }
            await service.createEmployee(_data)
            handleCreateEmployee()

        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateEmployee = async () => {
        try {
            let response = await service.getAllEmployee()
            setEployees(response)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDelete = (data: any) => {
        let _employees = [...employees]
        service.deleteEmployee(_employees[data])
        handleCreateEmployee()
    }


    //Update anything about employee (1/3)
    const handleChange = async (data:any)=>{
        let _employees = [...employees]
        let index:any = _employees[data]
        console.log(index.firstName)
        setEdit(true)
        setToUpdateEmply({firstName:index.firstName,
                        lastName:index.lastName,
                        email:index.email,
                        phone:index.phone,
                        id:index._id})
    }

    //Update anything about employee (2/3)
    const updateEmployee=async (data:any)=>{
        setEdit(false)
        console.log("updatedEmply:::",updatedEmply)
        await service.updateEmployee(updatedEmply)
        handleCreateEmployee()

    }

//Update anything about employee (3/3)
  const handleInputChange = (event:any)=> {
    const { name, value } = event.target;
    setToUpdateEmply({ ...updatedEmply, [name]: value });
  };

    
    return (
        <div style={{marginLeft:'50px'}} className="App">
            <h1>Employees List</h1>
                {edit?(<div>
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
                    <button  style={styles.button}type="submit">Update</button>
                </form>
                </div>):
                        <form onSubmit={formik.handleSubmit}>
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
                        <button  style={styles.button}type="submit">Submit</button>
                    </form>
                
                }
        
                <div>
                <Table striped bordered hover style={{ width: '50%',marginTop:'50px' }}>
                    <thead style={{ width: '50%' }}>
                        <tr style={{ width: '50%' }}>
                            <th style={{borderBottom:'1px solid #ccc'}}>company Name</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>#</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>First Name</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>Last Name</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>Email</th>
                            <th style={{borderBottom:'1px solid #ccc'}}>Phone</th>
                        </tr>
                    </thead>
                    {employees ? employees.map((row:any,index:any) =>
                        <tbody > 
                            <tr>  
                                <td>{row.companyDetail[0] ? row.companyDetail[0].name :'apple'}</td>
                                <td>{index+1}</td>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.email}</td>
                                <td>{row.phone}</td>
                                <button onClick={()=>handleChange(index)}> Update</button>
                                <button onClick={()=>handleDelete(index)}> Delete</button>
                             
                            </tr>
                        </tbody>
                    
                    ):null}

                </Table>
            </div>
           
        </div>
    )
}

export default Employees;

const styles ={
    fields:{ height:'100%',width:'100%',marginBottom:'10px'},
    text:{marginRight:'10px'},
    input:{height:'100%',width:'20%'},
    button:{ height:'100%',width:'20%',color:'green'}
}