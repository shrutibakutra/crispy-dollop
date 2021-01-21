import request from '../utils/request';

export default () => ({
    async createCompany(data:any){
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
        console.log('------',data._id)
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
        console.log('------')
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