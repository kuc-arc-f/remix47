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

//
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
//
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  let formData = await request.formData();
  let title = formData.get("title");
console.log("title=", title);
 // return redirect(`/tursotest`);
  return json({ ret: 'OK' })
}
//
export default function Index() {
  const actionData = useActionData<typeof action>();
  if(actionData){
    console.log(actionData.ret);
    location.href= '/';
  }
  //
  return (
    <div className="container mx-auto my-2 px-8 bg-white" >
      <h1 className="text-4xl font-bold">Test.tsx</h1>
      <hr />
      <Form method="post" name="form3" id="form3" 
      className="remix__form">
        <label className="text-2xl font-bold">
          <div>title:</div>
          <input  className="input_text"
          name="title" id="title" type="text" />
        </label>
        <div>
          <button type="submit" className="btn my-2"
          >Save</button>
        </div>
      </Form>
    </div>
  );
}
/*
*/
