import HttpCommon from '../lib/HttpCommon';
import LibConfig  from '../lib/LibConfig';
import Crud from './Crud';
import axios from 'axios';
//
const CrudIndex = {
  /**
   * getList
   * @param
   *
   * @return
   */
  getList: async function (): Promise<any>
  {
    try{
      const postItem = {
        userId: 0,
      }
console.log(postItem); 
      const url = import.meta.env.VITE_EXTERNAL_API_URL + "/test/get_list";
console.log("url=", url);
      /*
      const response = await fetch(url);
      const json = await response.json();
      */
      const body: any = JSON.stringify(postItem);
      const response = await axios.post(url, body, 
        {headers: { 'Content-Type': 'application/json'}
      });
      const data = response.data;
//console.log(data.data);      
      let items: any[] = [];
      items = data.data;
      return items;
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
  addItem : async function(item: any) : Promise<any>
  {
    try{
      let ret = false;
//          const json = await HttpCommon.post(item, "/test/create");
      const url = import.meta.env.VITE_EXTERNAL_API_URL + "/test/create";
      console.log("url=", url);
      const body: any = JSON.stringify(item);
      const response = await axios.post(url, body, 
        {headers: { 'Content-Type': 'application/json'}
      });
      const data = response.data;
      let items: any[] = [];
//      items = json;
//console.log(data);      
      return ret;
    } catch (e) {
        console.error("Error, addItem");
        console.error(e);
        throw new Error('Error , addItem');
    }
  },

}

export default CrudIndex;
