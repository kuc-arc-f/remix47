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
//console.log("title=", title);
  const errors = {};
  if (!title || title.length < 2) {
    errors.title = "title should be at least 2 characters";
  }
  // Return
  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const data = {
    title: title
  }
console.log(data);
  return json({ ret: 'OK', data: data })
}
//
export default function Index() {
  const actionData = useActionData<typeof action>();
  //
  if(actionData){
    console.log(actionData);
    if(actionData?.errors 
      && actionData?.errors.length < 1
    ){
      console.log("ret=", actionData.ret);
      console.log(actionData.data);
    }
    if (actionData?.errors &&
      Object.keys(actionData?.errors).length > 0) {
        console.log(actionData?.errors);
    }
  }
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white" >
    <div>{/* link_div */}
    <a href="/">[ home ]</a>
    </div>
    <hr />
    <h1 className="text-4xl font-bold">TestValid1.tsx</h1>
    <hr />
    <Form method="post" name="form3" id="form3" 
    className="remix__form">
      <label className="text-2xl font-bold">
        <div>title:</div>
        <input  className="input_text"
        name="title" id="title" type="text" />
      </label>
      {actionData?.errors?.title ? (
          <em className="error_message">{actionData?.errors.title}</em>
        ) : null}
      <div>
        <button type="submit" className="btn my-2"
        >Save</button>
      </div>
    </Form>
  </div>
  );
}
/* required
*/
