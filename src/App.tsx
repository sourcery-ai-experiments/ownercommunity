import './App.css';
import { Routes, Route } from 'react-router-dom';
import RequireMsal from './components/shared/require-msal';
import RequireAuth from './components/shared/require-auth';
import ApolloConnection from './components/shared/apollo-connection';

import { Root } from './components/layouts/root';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Accounts } from './components/layouts/accounts';
import { AuthLanding } from './components/shared/auth-landing';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  const authSection = (
    <RequireMsal identifier='account' forceLogin={true}>
      <AuthLanding />
    </RequireMsal>
  )
  const pageLayouts = localStorage.getItem('pageLayouts');
  const hasPageLayouts = pageLayouts && pageLayouts.length > 0;
  const rootSection = (
    <ApolloConnection AuthenticationIdentifier="account">
      {hasPageLayouts === true ? 
        <Root />
        :
        <div>Site not found</div>
      }
      <Root />
    </ApolloConnection>
  )

  const adminSection = (
    <RequireMsal identifier="account">
      <ApolloConnection AuthenticationIdentifier="account">
        <Admin />
      </ApolloConnection>
    </RequireMsal>
  )

  const accountsSection = (
    <RequireMsal identifier="account">
      <ApolloConnection AuthenticationIdentifier="account">
        <Accounts />
      </ApolloConnection>
    </RequireMsal>
  )
  
  const memberSection = (
    <RequireMsal identifier="account">
      <RequireAuth>
        <ApolloConnection AuthenticationIdentifier="account">
          <Members />
        </ApolloConnection>
      </RequireAuth>
    </RequireMsal>
  )



  useEffect(() => {
    const trySetPageLayouts = async (communityId:string) => {
     // https://ownercommunity.blob.core.windows.net/625641815f0e5d472135046c/website-root
        try {
        const api_call = await fetch(`https://ownercommunity.blob.core.windows.net/${ communityId }/website-root`); 
        const data = await api_call.json();
        if(data){
          localStorage.setItem('pageLayouts',JSON.stringify(data));
        }
        console.log('data...',data);
      } catch (error) {
        console.log('app: cannot find pageLayouts from URL:',error);
      }
    }

    const trySetCommunityId = async() => {
      console.log('app-mounted');
      //attempt to lookup community id from url
      try {
        const api_call = await fetch(`https://ownercommunity.blob.core.windows.net/community-domains/${ window.location.hostname + (window.location.port && window.location.port !== '80' ? ':' + window.location.port: '') }`);
        const data = await api_call.json();
        if(data && data.communityId ){
          console.log('community-id:',data.communityId);
          localStorage.setItem('community',data.communityId);
          localStorage.setItem('communityUrl',`${window.location.protocol}//${window.location.hostname + (window.location.port && window.location.port !== '80' ? ':' + window.location.port: '')}`);
          await trySetPageLayouts(data.communityId);
        }
      } catch (error) {
        console.log('app: cannot find community from URL:',error);
      }

    }
    trySetCommunityId();
    setLoading(false);
  }, [setLoading]);

  return loading ? <></>:(
    <>
      <Routes>
        <Route path="*" element={rootSection}></Route>
        <Route path='/community/:communityId/admin/*' element={adminSection} />
        <Route path='/community/:communityId/members/*' element={memberSection} />
        <Route path='accounts/*' element={accountsSection} />
        <Route path='/login' element={authSection} />
      </Routes>
    </>
  );
}

export default App;