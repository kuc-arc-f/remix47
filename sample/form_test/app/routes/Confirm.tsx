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
import ConfirmDialog from '../components/ConfirmDialog'
//
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
export default function Index() {
  //
  const actionData = useActionData<typeof action>();
  if(actionData){
console.log("ret=", actionData.ret);
console.log(actionData.data);
  }
  //
  const cbFunc = async function(){
    console.log("#cbFunc");
    alert("parent.cbFunc");
    const dlg = document.getElementById('confirmDialog');
    if(dlg) {
      //@ts-ignore
      dlg.close();
    }
  }
  /**
   *
   * @param
   *
   * @return
   */
  const testProc = async function(){
//console.log("testProc" + new Date().toString() );
    try {
      const modalDialog = document.getElementById('confirmDialog');
      if(modalDialog) {
        //@ts-ignore
        modalDialog.showModal();
      }
    } catch (e) {
      console.error(e);
    }
  }
  //
  return (
    <div className="container mx-auto my-2 px-8 bg-white">
      <h1 className="text-4xl font-bold">Confirm.tsx!</h1>
      <hr className="my-2" />
      <button className="btn-purple" onClick={()=>testProc()}>Test
      </button>
      {/* dialog */}
      <ConfirmDialog message={`OK? next`} cbFunction={cbFunc} />
    </div>
  );
}
/*
*/
