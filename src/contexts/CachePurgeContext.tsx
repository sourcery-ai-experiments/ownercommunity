import React, { ReactNode, createContext, useEffect, useState, Fragment } from 'react';
import packageVersion from "../../package.json"
import axios from "axios"
import { useFeatureFlags } from '../components/shared/feature-flag-react-lite';
(global as any).appVersion = packageVersion.version
const version=(global as any).appVersion
interface CachePurgeContextType {
  actualVersion: string;
  cachedVersion: string;
  featureFlagVersion: string;
  forcePurgeCache: () => void;
 
}



export const CachePurgeContext = createContext<CachePurgeContextType>({
  actualVersion: '',
  cachedVersion: version,
  featureFlagVersion: '',
  forcePurgeCache: () => {
    window.location.reload()
    console.log("Done purging cache")
  },
});


export const CachePurgeProvider = ({ children }: { children: ReactNode }) => {
  const [purgingStatus, setPurgingStatus] = useState(true);
  const {GetFeatureFlagByName}=useFeatureFlags()
  const featureFalgVersion=GetFeatureFlagByName('UI_CONFIG_VERSION')
  const [actualVersion, setActualVersion] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios('/meta.json');
        setActualVersion(data.version);
        
        
        // Compare the version in the meta.json file with the version in the package.json file
        if (data.version !== version) {
          // If the versions are different, then force the browser to purge the cache
          window.location.reload();
        } else {
          // If the versions are the same, set purging status to false
          setPurgingStatus(false);
        }
      } catch (error) {
        console.log(error);
      }
    })()
  
  }, []);

  // check version on server
  const checkVersion=async ()=>{
    const { data } = await axios('/meta.json');
    setActualVersion(data.version);
    return data.version
  }

  // force cache if the versions are different
  const purgeCache=()=>{
    if (checkVersion !== version) {
      // If the versions are different, then force the browser to purge the cache
      window.location.reload();
    }
  }

  // run the purge cache function every 5 seconds using setInterval

  useEffect(() => {
    const interval = setInterval(() => {
      purgeCache()
    }, 5000);
    return () => clearInterval(interval);
  }, [purgingStatus]);
  
  return (
    <CachePurgeContext.Provider value={{
      actualVersion,
      featureFlagVersion: featureFalgVersion,
      cachedVersion: version,
      forcePurgeCache: () => {
        window.location.reload()
        console.log("Done purging cache")
      }
    }}>
      {purgingStatus?(
        <h1>
          Purging cache
        </h1>
      ):(
       children
      )}
    </CachePurgeContext.Provider>
  )
}
export default CachePurgeContext