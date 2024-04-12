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
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import CrudIndex from './TursoTest/CrudIndex';
import CrudShow from './TursoTest/CrudShow';
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
  let title = formData.get("title");
  const item = {
    title: title,
    content: "c1",
  }
  const resulte = await CrudIndex.addItem(item);
  console.log(resulte);
console.log("title=", title);
  return redirect(`/tursotest`);
//  return json({ result: 'OK' })
}
//
export default function Index() {
  const { data } = useLoaderData<typeof loader>();
console.log(data);
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
    </div>
  );
}
/*
*/
