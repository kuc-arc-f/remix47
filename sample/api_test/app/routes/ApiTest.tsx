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
import { z } from 'zod';
import CrudIndex from './ApiTest/CrudIndex';
import LibConfig from '../lib/LibConfig';
import LoadBox from '../components/LoadBox';
//
let initDisplay = true;
/**
*
* @param
*
* @return
*/
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
export const loader = async () => {
  const resulte = await CrudIndex.getList();
//console.log(resulte);
  return json({
     contacts: resulte.data, data: resulte
  });
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
  const retObj = { ret: LibConfig.NG_CODE, errors: {} };
  try {
    let formData = await request.formData();
    let title = formData.get("title");
    const item = {
      title: title,
      content: "c1",
    }
console.log("title=", title);
    const zodFormData = z.object({
      title: z
        .string()
        .min(2, { message: '2文字以上入力してください。' }),
    });
    zodFormData.parse(item);
    const resulte = await CrudIndex.addItem(item);
    console.log(resulte);
    return json({ ret: LibConfig.OK_CODE });
  } catch (e) {
    console.error(e.flatten().fieldErrors);
    retObj.errors = e.flatten().fieldErrors;
    return json(retObj);
  }
}
/**
*
* @param
*
* @return
*/
export default function Index() {
  const { contacts, data } = useLoaderData<typeof loader>();
console.log(contacts);
  const actionData = useActionData<typeof action>();
  const [updatetime, setUpdatetime] = useState<string>("");
  //
  useEffect(() => {
    initDisplay = false;
    setUpdatetime(new Date().toString() + String(Math.random()));
  }, []);
  //
  if(actionData){
console.log(actionData);
//console.log(actionData?.errors?.title);
    if(actionData.ret === LibConfig.OK_CODE){
      location.reload();
    }
  }
  //
  return (
  <>
    {initDisplay ? (<LoadBox />) : null}
    <div className="container mx-auto my-2 px-8 bg-white" >
      <h1 className="text-4xl font-bold">ApiTest.tsx!</h1>
      <hr />
      <Form method="post" name="form3" id="form3" 
      className="remix__form">
        <label>
          <div>Title:</div>
          <input  className="input_text"
          name="title" id="title" type="text" />
        </label>
        {actionData?.errors?.title && (
          <div className="error_message">{actionData?.errors?.title}</div>
        )}
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
  </>
  );
}
/*
*/
