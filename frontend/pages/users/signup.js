import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import Router from 'next/router';
import React from 'react'
import Layout from '../../components/Layout';
import { setToken } from '../../lib/auth';

const Signup = () => {
  return (
    <Layout>
      <Formik
        initialValues={{username: "", email: "", password: ""}}
        onSubmit={
          async (values, {setSubmitting}) => {
            console.log("🚀 ~ values", values)
            try {
              const res = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, values)
              console.log("🚀 ~ res", res)
              
              setToken(res.data);
              Router.push("/");

            } catch (error) {
              console.log(error)
            }
            setSubmitting(false);
          }
        }
      >
        {
          ({isSubmitting}) => (
            <Form className="rounded-lg border-2 border-slate-400 p-4 flex flex-col gap-2">
              <Field disabled={isSubmitting} placeholder="email" type="text" name="email" className="w-full border-2 border-slate-300 rounded-sm p-2 text-sm"/>
              <Field disabled={isSubmitting} placeholder="username" type="text" name="username" className="w-full border-2 border-slate-300 rounded-sm p-2 text-sm"/>
              <Field disabled={isSubmitting} placeholder="password" type="text" name="password" className="w-full border-2 border-slate-300 rounded-sm p-2 text-sm"/>
              <button disabled={isSubmitting} type="submit" className={`btn-primary p-1 ${isSubmitting ? "bg-gray-400" : ""}`}>Signup</button>
            </Form>
          )
        }
      </Formik>
    </Layout>
  )
}

export default Signup;