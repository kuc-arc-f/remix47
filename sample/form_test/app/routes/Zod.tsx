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
import { useState } from 'react';
import { z } from 'zod';
import DialogBox from '../components/DialogBox';
import ErrorDialogBox from '../components/ErrorDialogBox';
//
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
/**
 * action
 * @param
 *
 * @return
 */
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  let formData = await request.formData();
  let email = formData.get("email");
  const data = {
    email: email
  }
console.log("email=", email);
console.log(data);
  return json({ ret: 'OK', data: data })
}
/**
 *
 * @param
 *
 * @return
 */
export default function Index() {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(null);
  //
  const FormData = z.object({
    email: z
      .string()
      .email({ message: 'メールアドレスの形式ではありません。' }),
    password: z
      .string()
      .min(1, { message: '1文字以上入力してください。' })
      .max(32, { message: '32文字以下で入力してください。' }),
  });
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setErrors(null);
      FormData.parse(data);
console.log(data);
console.log(errors);
      const modalDialog = document.getElementById('modalDialog');
      if(modalDialog) {
        //@ts-ignore
        modalDialog.showModal();
      }
    } catch (e) {
      console.error(e.flatten().fieldErrors);
      setErrors(e.flatten().fieldErrors);
      const dlg = document.getElementById('errorModalDialog');
      if(dlg) {
        //@ts-ignore
        dlg.showModal();
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const actionData = useActionData<typeof action>();
  if(actionData){
console.log("ret=", actionData.ret);
console.log(actionData.data);
  }
  //
  return (
    <div className="container mx-auto my-2 px-8 bg-white">
      <h1 className="text-4xl font-bold">ログイン</h1>
      <hr className="my-2" />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-2xl font-bold">Email</label>
          <input className="input_text"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        {errors?.email && (<div className="error_message">{errors.email}</div>
        )}
        <hr className="my-2" />
        <div>
          <label htmlFor="password" className="text-2xl font-bold">パスワード
          </label>
          <input className="input_text"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        {errors?.password && (<div className="error_message">{errors.password}</div>
        )}
        <hr className="my-2" />
        <div>
          <button type="submit" className="btn-purple">ログイン
          </button>
        </div>
      </form>
      {/* dialog */}
      <DialogBox message={`OK, Check Complete!!`} />
      <ErrorDialogBox message={`NG, Check!`} />
    </div>
  );
}
/*
const FormData = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(12),
});
*/
