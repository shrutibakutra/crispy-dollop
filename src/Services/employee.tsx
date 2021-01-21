import request from '../utils/request';

export default () => ({
    async createEmployee(data:any){
        try{
            const options ={
                method:'POST',
                body: JSON.stringify(data),
            };
            const response = await request(`/create/employee`,options);
            // response.push(data)
            alert(JSON.stringify("Employee created successfully"));
            return response;
        } catch(error){
            throw error;
        }
    },
    async getAllEmployee(){
        try{
            const options ={
                method:'GET',
            };
            const response = await request(`/getAll/employee`,options);
            return response;
        } catch(error){
            throw error;
        }
    },
    async deleteEmployee(employee:any){
        let employeeId = employee._id
        try{
            const options ={
                method:'DELETE',
            };
            const response = await request(`/delete/employee/${employeeId}`,options);
            alert(JSON.stringify("Employee deleted successfully"));
            return response;
        } catch(error){
            throw error;
        }
    },
    async updateEmployee(employee:any){
        console.log("updating employee...")
        let employeeId = employee.id

        try{
            const options ={
                method:'PUT',
                body: JSON.stringify(employee),

            };
            const response = await request(`/update/employee/${employeeId}`,options);
            alert(JSON.stringify("Employee updated successfully"));
            return response;
        } catch(error){
            throw error;
        }
    }
})