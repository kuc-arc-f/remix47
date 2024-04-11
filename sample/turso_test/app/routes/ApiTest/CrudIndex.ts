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
//console.log(json);      
      const json = await HttpCommon.post(postItem, "/test/get_list");
      let items: any[] = [];
      items = json;
/*
*/
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
  addItem : async function(item) : Promise<any>
  {
      try{
          let ret = false;
          const json = await HttpCommon.post(item, "/test/create");
          let items: any[] = [];
          items = json;
console.log(json);      
          /*
          const postItem = {
            userId: 0,
          }
    console.log(postItem); 
          const values = Crud.getInputValues();
          const item = {
              "api_key": "",
              "title": values.title,
              "content": "content1",
              "completed": 0,
              "userId": 0
          };            
console.log(item);
          const json = await HttpCommon.serverPost(item, "/test/create");
          if (json.ret ===  LibConfig.OK_CODE) {
              ret = true;
          }
          */
          return ret;
      } catch (e) {
          console.error("Error, addItem");
          console.error(e);
          throw new Error('Error , addItem');
      }
  },

}

export default CrudIndex;
