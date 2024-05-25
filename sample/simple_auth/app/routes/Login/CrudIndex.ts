//import HttpCommon from '../lib/HttpCommon';
//import LibConfig  from '../lib/LibConfig';
//import Crud from './Crud';
//
const CrudIndex = {
    /**
     * getList
     * @param
     *
     * @return
     */
    getList :async function (): Promise<any>
    {
        try{
        } catch (e) {
            console.error(e);
            throw new Error("Error, getList");
        } 
    },  
    /**
     *
     * @param
     *
     * @return
     */
    login : function(formData: any) : boolean
    {
      try{
        let ret = false;
        let inputEmail = formData.get("email");
        let inputPassword = formData.get("password");
console.log("inputEmail=", inputEmail);
console.log("inputPassword=", inputPassword);
        const email = import.meta.env.VITE_AUTH_USER;
        const password = import.meta.env.VITE_AUTH_PASSWORD;
        //console.log("email=", email);
        if(
            (inputEmail === email) && (inputPassword === password)
        ){
            return true;
        }
        return ret;
      } catch (e) {
        console.error("Error, addItem");
        console.error(e);
        throw new Error('Error , addItem');
      }
    },
}

export default CrudIndex;
