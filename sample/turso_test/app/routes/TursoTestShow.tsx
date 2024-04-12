import {useState, useEffect}  from 'react';
import type { MetaFunction } from "@remix-run/node";
//import { useLocation } from 'remix';
import { useLocation } from "@remix-run/react";
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
import CrudIndex from './TursoTest/CrudIndex';
import CrudShow from './TursoTest/CrudShow';
import LibConfig from '../lib/LibConfig';
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
console.log(id);
  const resulte = await CrudShow.get(Number(id));
//console.log(resulte);
  return json({ data: resulte });
};
//
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  let formData = await request.formData();
  let item_id = formData.get("item_id");
  const item = {
    id: item_id,
  }
//console.log(item);
  const resulte = await CrudShow.delete(Number(item_id));
  //console.log(resulte);
  //return redirect(`/tursotest`);
  return json({ ret: LibConfig.OK_CODE })
}
//
export default function Index() {
  const { data } = useLoaderData<typeof loader>();
//console.log(data);
  const actionData = useActionData<typeof action>();
  if(actionData){
    console.log(actionData.ret);
    location.href= '/tursotest';
  }
  //
  return (
    <div className="container mx-auto my-2 px-8 bg-white" >
      <a href={`/tursotest`}>
        <button className="btn-outline-purple">Back</button>
      </a>
      <hr className="my-2" />
      <h1 className="text-4xl font-bold">TursoTestShow</h1>
      <hr className="my-2" />
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <hr className="my-2" />
      <p>id: {data.id}, {data.createdAt}</p>
      <hr />
      <Form method="post" name="form_delete" id="form_delete" 
      className="remix__form">
        <label className="text-2xl font-bold d-none">
          <div>title:</div>
          <input  className="input_text" defaultValue={data.id}
          name="item_id" id="item_id" type="text" />
        </label>
        <div>
          <button type="submit" className="btn-red my-2"
          >Delete</button>
        </div>
      </Form>
    </div>
  );
}
/*
*/
