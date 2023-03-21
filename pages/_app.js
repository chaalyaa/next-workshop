// import '@/styles/globals.css'
import '@/src/assets/sass/main.scss' 
// import '@/src/assets/dist/styles.css' 

import { useRouter } from 'next/router';
import ProductLayout from '@/src/components/layout';

import { SessionProvider, getSession } from 'next-auth/react'

// Dsc: Untuk membuat layoutD
function AppSwitchThemes({children}){
  const router = useRouter();
  if(router.asPath.startsWith('/product')){
    return (
      <ProductLayout>
        {children}
      </ProductLayout>
    )
  } else if(router.asPath.startsWith('/dashboard')){
    <DashboardLayout>
      {children}
    </DashboardLayout>
  } else {
    return children
  }
}

function App(props){
  let { Component, session, pageProps } = props;

  console.log(`[Session]\n${"-".repeat(4)}\n`, props)
  return (
    <SessionProvider session={session}>
      <AppSwitchThemes>
        <Component {...pageProps}/>
      </AppSwitchThemes>
    </SessionProvider>
  )
}

App.getInitialProps = async({Component,ctx}) =>{
  let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const session = await getSession(ctx);

  return {
    pageProps: {
      ...pageProps,
      session,
    }
  }
}

export default App;

/*export default function App({ Component, pageProps }) {
  // Note: Default first instalation
  // return <Component {...pageProps} />

  return (
    <AppSwitchThemes>
      <Component {...pageProps} />
    </AppSwitchThemes>
  )
}*/
