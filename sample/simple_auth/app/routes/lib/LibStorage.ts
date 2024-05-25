
//import LibConfig from './LibConfig';
//
const LibStorage = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  logoutKey : function(key: string): any
  {
    //console.log("#Layout.startProc");
    let ret = false;
    localStorage.removeItem(key);
    ret = true;
    return ret;
  }
}

export default LibStorage;
