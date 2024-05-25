import type { MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {useState, useEffect}  from 'react';
import CrudIndex from './Login/CrudIndex';
//
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
/**
 *
 * @param
 *
 * @return
 */
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  let formData = await request.formData();
  const valid = CrudIndex.login(formData);
console.log("valid=", valid);
  if(!valid) {
    return json({ ret: 'NG', data: {}})
  }
//console.log(data);
  return json({ ret: 'OK', data: {}})
}
/**
 *
 * @param
 *
 * @return
 */
export default function Index() {
  
  const actionData = useActionData<typeof action>();
  //
  useEffect(() => {
    if(actionData){
console.log("ret=", actionData.ret);
      //console.log(actionData.data);
      const name = import.meta.env.VITE_APP_NAME + "_auth";
console.log("rname=", name);
      if(actionData.ret === 'OK'){
        localStorage.setItem(name, '1');
        console.log("actionData.ret=OK");
        location.href = '/';
      }else{
        alert("Error, Login");
      }
    }
  }, [actionData]);
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white" >
    <h1 className="text-4xl font-bold">Login</h1>
    <hr className="my-2" />
    <Form method="post" name="form3" id="form3" 
    className="remix__form">
      <label className="text-2xl font-bold">Email:
        <input  className="input_text"
        name="email" id="email" type="text" required />
      </label>
      <label className="text-2xl font-bold">Password:
        <input  className="input_text"
        id="password" name="password" type="password" required />
      </label>

      <div>
        <button type="submit" className="btn my-2"
        >Login</button>
      </div>
    </Form>
  </div>
  );
}
/*
*/
