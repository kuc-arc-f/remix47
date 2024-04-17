import {useState, useEffect}  from 'react';
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
import CrudIndex from './ApiTest/CrudIndex';
import LibConfig from '../lib/LibConfig';
//
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
//
export const loader = async () => {
  const resulte = await CrudIndex.getList();
//console.log(resulte);
  return json({
     contacts: resulte.data, data: resulte
  });
};
//
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  let formData = await request.formData();
  let title = formData.get("title");
  const item = {
    title: title,
    content: "c1",
  }
  const resulte = await CrudIndex.addItem(item);
  console.log(resulte);
console.log("title=", title);
//  return redirect(`/apitest`);
  return json({ ret: LibConfig.OK_CODE });
}
//
export default function Index() {
  const { contacts, data } = useLoaderData<typeof loader>();
//console.log(contacts);
  const actionData = useActionData<typeof action>();
  if(actionData){
    console.log(actionData.ret);
    if(actionData.ret === LibConfig.OK_CODE){
      //location.reload();
    }
  }
  //
  return (
    <div className="container mx-auto my-2 px-8 bg-white" >
      <h1 className="text-4xl font-bold">Test.tsx</h1>
      <hr />
      <Form method="post" name="form3" id="form3" 
      className="remix__form">
        <label>
          <div>title:</div>
          <input  className="input_text"
          name="title" id="title" type="text" />
        </label>
        <div>
          <button type="submit" className="btn my-2"
          >Save</button>
        </div>
      </Form>
      <hr />
      <ul>
        {contacts.map(item => (
          <li key={item.id} className="remix__page__resource">
            <h3 className="text-3xl font-bold">{item.title}</h3>
            <p>ID :{item.id}</p>
            <a href={`/apitestshow?id=${item.id}`}>
              <button className="btn-outline-purple ms-2">Show</button>
            </a>
            <hr className="my-2" />
          </li>
        ))}
        </ul>
    </div>
  );
}
/*
<Link to={`./${item.id}`}>[ Show ]</Link>
<Link to={`edit/${item.id}`}>[ edit ]</Link>
*/
