import LibConfig from './LibConfig';
//require('dotenv').config();
import axios from 'axios';
//
const HttpCommon = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  post: async function(item: any, path: string): Promise<any>
  {
    try {
      const apiUrl = import.meta.env.VITE_EXTERNAL_API_URL; 
      console.log(apiUrl); 
      const body: any = JSON.stringify(item);
//return;
      const response = await axios.post(apiUrl + path, body, 
        {headers: { 'Content-Type': 'application/json'}
      });
      const data = response.data;
console.log("path=", path);
//console.log(data);
      return data;
    } catch (e) {
      console.error(e);
      throw new Error('Error , post');
    }
  }, 
  /**
  * 
  * @param
  *
  * @return
  */ 
  serverPost: async function(item: any, path: string): Promise<any>
  {
    try {
      item.api_key = "";
      item.api_url = path;
console.log(item);
//return;
      const body: any = JSON.stringify(item);		
      const res = await fetch("/api/common/send_post", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      //console.log(json);   
      if (res.status !== 200) {
        console.error("error, status <> 200");
        throw new Error(await res.text());
      }
      if (json.ret !==  LibConfig.OK_CODE) {
        console.error("Error, json.ret <> OK");
        return {};
      } 
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('Error , post');
    }
  },  
}
export default HttpCommon;
