import request from '../utils/request';

export default () => ({
    async createCompany(data:any){
        console.log(data)
        try{
            const options ={
                method:'POST',
                body: JSON.stringify(data),
            };
            const response = await request(`/create/company`,options);
            alert(JSON.stringify("Company created successfully"));
            return response;
        } catch(error){
            throw error;
        }
    },
    async deleteCompany(data:any){
        let companyId = data._id
        try{
            const options ={
                method:'DELETE',
                body: JSON.stringify(data),
            };
            const response = await request(`/delete/company/${companyId}`,options);
            alert(JSON.stringify("Company deleted successfully"));
            return response;
        } catch(error){
            throw error;
        }
    },
    async updateCompany(data:any){
        try{
            const options ={
                method:'PUT',
                body: JSON.stringify(data),
            };
            const response = await request(`/create/company`,options);
            alert(JSON.stringify("Company updated successfully"));
            return response;
        } catch(error){
            throw error;
        }
    },
    async createUser(data:any){
        try{
            const options = {
                method:'POST',
                body:JSON.stringify(data),
            };
            const response = await request(`/register/User`,options)
            alert(JSON.stringify("User created successfully"));
            return response;
        } catch(error){
            throw error;
        }
    },
    async loginUser(data:any){
        try{
            const options = {
                method:'POST',
                body:JSON.stringify(data),
            };
            const response = await request(`/login/User`,options)
           
            if (response.code ==200){
                alert(JSON.stringify("User Logged in successfully"));
            }
            return response;
        } catch(error){
            throw error;
        }

    },
    async getCompany(){
        try{
            const options ={
                method:'GET',
              
            };
            const response = await request(`/getAll/company`,options);
            return response;
        } catch(error){
            throw error;
        }
    }
})