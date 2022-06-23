import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/store';


const Nav = () => {
  const { user, loading } = useUser();

  return (
    <nav className='
      flex flex-wrap
      items-center
      justify-between
      w-full
      py-4
      md:py-0
      px-4
      text-lg
      text-gray-700
      bg-slate-100
    '>
      <div>
        <Link href="/" passHref>
          <a>test</a>
        </Link>
      </div>
      <div id="menu">
        <ul className="
          pt-4
          text-base text-gray-700
          md:flex
          md:justify-between
          items-center
          md:pt-0 space-x-2
        ">
          <li>
            <Link href="/">
              <a className="md:p-2 py-2 block hover:text-teal-600">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/forums">
              <a className="md:p-2 py-2 block hover:text-teal-600" href="#">Forum</a>
            </Link>
          </li>
          {
            user ?
            <button className="btn-primary py-[0.125rem]" onClick={unsetToken}>Logout</button>
            :
            <Formik
              initialValues={{identifier: "", password: "",}}
              validate={values => {
                const errors = {};
                if (!values.identifier) {errors.identifier = "*Required*"};
                if (!values.password) {errors.password = "*Required*"};
                return errors;
              }}
              onSubmit={
                async (values, {setSubmitting}) => {
                try {
                  const res = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, values);
                  // console.log(res.data);
                  setToken(res.data);
                  setSubmitting(false);
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              {
                ({ isSubmitting }) => (
                  <Form className="flex gap-1" autoComplete='off'>
                    <div className="flex items-center justify-end">
                    <Field placeholder="username" type="text" name="identifier" className="rounded bg-slate-200 px-2 py-1 relative text-sm focus:outline-sky-600 border-[1px] border-gray-400" />
                    <ErrorMessage name="identifier" component="div" className="text-xs text-red-500 px-2 absolute pointer-events-none opacity-70" />
                    </div>
                    <div className="flex items-center justify-end">
                    <Field placeholder="password" type="password" name="password" className="rounded bg-slate-200 px-2 py-1 relative text-sm focus:outline-sky-600 border-[1px] border-gray-400"/>
                    <ErrorMessage name="password" component="div" className="text-xs text-red-500 px-2 absolute pointer-events-none opacity-70" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className={`btn-primary ${isSubmitting ? "bg-gray-400" : ""}`}>Login</button>
                    {/* <button disabled={isSubmitting} onClick={() => setShowLogin(false)} className={`btn-primary ${isSubmitting ? "bg-gray-400" : ""}`}>Close</button> */}
                  </Form>
                )
              }
            </Formik>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Nav;