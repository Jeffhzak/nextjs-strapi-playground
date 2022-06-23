import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import Layout from '../../../components/Layout';
import { fetcher } from '../../../lib/api';
import { getTokenFromCookies } from '../../../lib/auth';
import { useUser } from '../../../lib/store';

const Post = ({thread, jwt}) => {
console.log("🚀 ~ jwt", jwt)
console.log("🚀 ~ thread", thread)
const commentsArray = thread?.attributes?.posts.data;

  const { user } = useUser();
  const router = useRouter();
  
  return (
    <Layout>
      <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-tr from-blue-800 to-teal-400 py-2">
          {thread?.attributes?.title}
        </span>
      </h1>
      <div>
        <span className="font-normal text-base">Written by: {thread?.attributes?.author}</span>
      </div>
      <div className="flex flex-col gap-2">
        {thread?.attributes?.body}
      </div>
      <div className="flex flex-col gap-2">
      {
        commentsArray.map((comment) => {
          return (
            <div key={comment.id} className="flex bg-slate-100 gap-4 rounded-sm p-2">
              <span className="text-base border-r-2 border-r-slate-300 px-4 py-2">{comment.attributes.author}</span>
              <p className="text-base">{comment.attributes.comment}</p>
            </div>
          )
        })
      }
      </div>
      {
        user && jwt ?
        <Formik
          initialValues={{body: ""}}
          validate={values => {
            const errors = {};
            if (!values.body) {
              errors.body = 'You need to post something!';
            }
            return errors;
          }}
          onSubmit={(values, {setSubmitting}) => {
            
            const headers = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`
            }
            try {
              // console.log({body: {comment: values.body, author: user}, headers: {headers: headers}})
              axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts`, {data: {comment: values.body, author: user, thread: thread}}, {headers: headers})
            } catch (error) {
              console.log(error);
            }
            setSubmitting(false);
            // router.reload();
          }}
        >
          {
            ({isSubmitting}) => (
              <Form>
                <Field disabled={isSubmitting} placeholder="Write a comment..." type="textarea" name="body" className="w-full border-2 border-slate-300 rounded-sm p-2 text-sm" />
              </Form>
            )
          }
        </Formik>
        :
        null
      }
    </Layout>
  )
} 


export async function getServerSideProps(ctx) {
  const {slug} = ctx.params;
  const jwt = getTokenFromCookies(ctx);

  const threadResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/thread/${slug}?populate=posts`);
  console.log("🚀 ~ threadResponse", threadResponse)
  return {
    props: {
      thread: threadResponse.data,
      jwt: jwt,
    }
  }
}


export default Post;