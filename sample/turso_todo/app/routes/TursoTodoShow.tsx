import { useEffect, useRef } from "react";
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
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import CrudIndex from './TursoTodo/CrudIndex';

//
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
//
export const loader = async () => {
//console.log("id=", id);
  const resulte = await CrudIndex.getList();
  const contacts = resulte.data;
  return json({ contacts });
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
  return redirect(`/test`);
//  return json({ result: 'OK' })
}
//
export default function Page() {
  let items = [];

  if(typeof(window) !== 'undefined'){
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id') || "";
console.log("useE", id);
//    let { contacts } = useLoaderData<typeof loader>();
//    console.log(contacts);
  }

//
  return (
    <div className="container mx-auto my-2 px-8 bg-white" 
    style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-4xl font-bold">TursoTodoShow.tsx</h1>
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
          >Submit</button>
        </div>
      </Form>
      <hr />
    </div>
  );
}
/*
<Link to={`./${item.id}`}>[ Show ]</Link>
<Link to={`edit/${item.id}`}>[ edit ]</Link>
*/
