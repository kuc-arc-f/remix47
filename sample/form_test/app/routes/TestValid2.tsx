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
import { useEffect, useState } from "react";
//types
type ErorTypes = {
  title: string;
};
//value
const errors = {
  title: "",
};
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
  const data = {
    title: title
  }
console.log(data);
  return json({ ret: 'OK', data: data })
}
//
export default function Index() {
  const [errorMessages, setErrorMessages] = useState<string>("");
  const actionData = useActionData<typeof action>();
  //
  if(actionData){
console.log("ret=", actionData.ret);
console.log(actionData.data);
  }
  //
  const check = async function(){
    setErrorMessages("");
    const title = document.querySelector("#title") as HTMLInputElement;
    if(title){
console.log("title=", title.value);
console.log("title.len=", title.value.length);
      if(title.value.length < 2) {
        const s = `文字数= ${title.value.length}, title should be at least 2 characters`;
//console.log(s);
        errors.title = s;
        setErrorMessages(JSON.stringify(errors));
        alert(s);
        return;
      }
      const form1: any = document.querySelector("#form1") as HTMLInputElement;
      form1.submit();
    }
  }
//console.log(errors);
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white" >
    <div>{/* link_div */}
    <a href="/">[ home ]</a>
    </div>
    <span className="d-none">error_json: {errorMessages}
    </span>
    <hr />
    <h1 className="text-4xl font-bold">TestValid2.tsx!</h1>
    <hr />
    <span>Client validate</span>
    <hr />
    <Form method="post" name="form1" id="form1" 
    className="remix__form">
      <label className="text-2xl font-bold">
        <div>title:</div>
        <input  className="input_text"
        name="title" id="title" type="text" required />
      </label>
      {errors?.title ? (
        <em className="error_message">{errors.title}</em>
      ) : null}
    </Form>
    <div>
        <button type="submit" className="btn my-2" onClick={()=>check()}
        >Save</button>
    </div>
  </div>
  );
}
/*//  const [errors, setErrors] = useState<ErorTypes>({});
*/
