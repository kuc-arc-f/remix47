
import { createClient } from "@libsql/client";
//
const  LibTurso = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  getClient: function(){
    try{
//console.log("=", process.env.TORSO_URL);
//TORSO_AUTH_TOKEN
      const client = createClient({
        url: process.env.VITE_TURSO_URL,
        authToken: process.env.VITE_TURSO_AUTH_TOKEN,
      });
      return client;      
    } catch (err) {
      console.log(err);
      throw new Error('Error, getClient');
    }
  },       
}
export default LibTurso;
