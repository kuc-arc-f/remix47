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
import CrudShow from './ApiTest/CrudShow';
import LibConfig from '../lib/LibConfig';
//value
let itemId = 0;
//
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
//
export const loader = async (
  { request }: LoaderFunctionArgs
) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  itemId = Number(id);
console.log("id=", id);
  const resulte = await CrudShow.get(itemId);
//console.log(resulte);
  return json({
    data: resulte
  });
};
//
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  let formData = await request.formData();
  let item_id = formData.get("item_id");
console.log("itemId=", itemId);
  const resulte = await CrudShow.delete(itemId);
  if(resulte) {
    location.href= "/apitest";
  }
  /*
  const resulte = await CrudIndex.addItem(item);
  console.log(resulte);
  */
  return json({ ret: LibConfig.OK_CODE });
}
//
export default function Index() {
  const { data } = useLoaderData<typeof loader>();
console.log(data);
  const actionData = useActionData<typeof action>();
  if(actionData){
    console.log("ret=", actionData.ret);
    if(actionData.ret === LibConfig.OK_CODE){
      location.href= "/apitest";
    }
  }
  //
  return (
    <div className="container mx-auto my-2 px-8 bg-white" >
      <h1 className="text-4xl font-bold">ApiTestShow.tsx</h1>
      <hr className="my-2" />
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <hr className="my-2" />
      <p>id: {data.id}, {data.createdAt}</p>
      <hr className="my-2" />
      <Form method="post" name="form_delete" id="form_delete" 
      className="remix__form">
        <label className="text-2xl font-bold d-none">
          <div>title:</div>
          <input  className="input_text" defaultValue={itemId}
          name="item_id" id="item_id" type="text" />
        </label>
        <div>
          <button type="submit" className="btn-red my-2">Delete</button>
        </div>
      </Form>
      <hr />
    </div>
  );
}
/*
<hr className="my-2" />
<button className="btn-red" onClick={()=>deleteProc()}>Delete
</button>    
*/
