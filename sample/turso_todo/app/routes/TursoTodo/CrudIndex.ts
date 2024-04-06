//import LibConfig  from '../lib/LibConfig';
//import Crud from './Crud';
import LibTurso from '../../lib/LibTurso';
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
      const retObj = {ret: "NG", data: [], message: ""};
      try{
        const client = await LibTurso.getClient();
        const sql = `SELECT * FROM todos ORDER BY id DESC LIMIT 100;`;
  console.log(sql);
        const resulte = await client.execute(sql);
  //console.log(resulte.rows);
        retObj.ret = "OK";
        //@ts-ignore
        retObj.data = resulte.rows;
        return retObj;
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
    addItem : async function(params: any) : Promise<any>
    {
      const retObj = {ret: "NG", data: [], message: ""};
      try{
        const sql = `
        INSERT INTO todos (title, content, userId) VALUES(
        '${params.title}' , '${params.content}' , 0
        )
        `;
  console.log("sql=", sql);
        const client = await LibTurso.getClient();
        const resulte = await client.execute(sql);
  //console.log(resulte.rows);
        retObj.ret = "OK";
        //@ts-ignore
        retObj.data = resulte.rows;
        return retObj;  
      } catch (e) {
        console.error("Error, addItem");
        console.error(e);
        throw new Error('Error , addItem');
      }
    },
}

export default CrudIndex;
