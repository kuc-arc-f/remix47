
import LibStorage from '../routes/lib/LibStorage';

//
export default function Compo(props: any) {

  const logout = function(){
    const name = import.meta.env.VITE_APP_NAME + "_auth";
    const d = LibStorage.logoutKey(name);
    //console.log(d);
    if(d) {
      location.href = '/login';
    }
  }
  //
  return (
  <div>
    <a href="/">[ home ]</a>
    <a href="/about">[ about ]</a>
    <a href="/test">[ Test ]</a>
    <a href="/login">[ Login ]</a>
    <a ><button onClick={()=>logout()}>[ Logout ]</button></a>
    <hr />
  </div>
  );
}

