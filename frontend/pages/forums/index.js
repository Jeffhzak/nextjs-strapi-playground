import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { Posts } from '../../components/Posts';
import { fetcher } from '../../lib/api';
import useSWR from 'swr';

const Forums = ({threads}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/threads?pagination[page]=${pageIndex}&pagination[pageSize]=2`, 
    fetcher, 
    {
      fallbackData: threads,
    }
  );
  const lastPage = data.meta.pagination.pageCount;

  // console.log("🚀 ~ data", data)
  
  const paginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= data.meta.pagination.pageCount; i++) {
      buttons.push(
        <button 
          key={`page-btn-${i}`} 
          disabled={pageIndex === i} 
          className={`text-sm py-1 px-2 rounded bg-slate-50 drop-shadow-md border-2 border-slate-300 ${pageIndex === i ? "bg-slate-300" : "hover:bg-slate-200"}`}
          onClick={() => setPageIndex(i)}
        >
          {i}
        </button>
      )
    }
    return buttons;
  }
  
  return (
    <Layout title="Strapi-App Forums">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-teal-400 py-2">
          Forums
        </span>
      </h1>
        <Posts posts={data}/>
      <div className="w-max justify-center items-center m-auto">
        <button 
          disabled={pageIndex === 1} 
          className={`text-sm py-1 px-2 rounded bg-slate-50 drop-shadow-md ${pageIndex === 1 ? "bg-slate-300" : "hover:bg-slate-200"}`}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
            {"<"}
          </button>
        {
          threads && paginationButtons()
        }
        <button 
          disabled={pageIndex === lastPage} 
          className={`text-sm py-1 px-2 rounded bg-slate-50 drop-shadow-md ${pageIndex === lastPage ? "bg-slate-300" : "hover:bg-slate-200"}`}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          {">"}
        </button>
      </div>
    </Layout>
  )
}

export default Forums;

export async function getStaticProps() {
  const forumResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?pagination[page]=1&pagination[pageSize]=2`);
  console.log("forumResponse", forumResponse)
  return {
    props: {
      threads: forumResponse,
    },
  }
}