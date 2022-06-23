import Head from "next/head"
import { useEffect } from "react";
import { getUserFromCookies } from "../lib/auth";
import { useUser } from "../lib/store";
import Nav from "./Nav";

const Layout = ({title = "Strapi App", children}) => {
  const { user, setUser, loading, setLoading } = useUser();
  
  useEffect(() => {
    if (user) return;
    let isMounted = true;
    
    const gotUser = getUserFromCookies();
    if (isMounted) {
      if (gotUser) setUser(gotUser); 
      else setUser(null);
    }
  
    return () => {
      isMounted = false;
    }
  }, [user, setUser])
  
    return (
      <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav/>
      <main className="px-4">
        <div className="
          flex
          justify-center
          items-center
          bg-white
          mx-auto
          w-2/4
          rounded-lg
          my-16
          p-16
        ">
          <div className="text-2xl font-medium">
            {children}
          </div>
        </div>
      </main>
      </>
    )
}

export default Layout;