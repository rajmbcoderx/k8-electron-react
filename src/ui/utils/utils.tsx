
export const WEBSITE_URL            = 'https://rajmbcoderx.github.io/k8-electron-react/';
export const RELEASE_URL            = 'https://github.com/rajmbcoderx/k8-electron-react/releases/tag/0.4.0';
export const LICENSE_URL            = 'https://github.com/k8-proxy/k8-proxy-desktop/blob/master/LICENSE';
export const FW_URL                 = 'https://forensic-workbench.com/';
export const FILE_DROP_URL          = 'https://file-drop.co.uk/';
export const REBUILD_ENGINE_URL     = 'https://8oiyjy8w63.execute-api.us-west-2.amazonaws.com/Prod/api/rebuild/base64';
export const REBUILD_ANALYSIS_URL   = 'https://o7ymnow6vf.execute-api.us-west-2.amazonaws.com/Prod/api/Analyse/base64';

export const REBUILD_API_KEY    = 'dp2Ug1jtEh4xxFHpJBfWn9V7fKB3yVcv60lhwOAG';
export const VERSION    = '0.4.0'



export const sleep = (milliseconds:number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  

  const _p8=(s:boolean) =>{

    var p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
}
 export const guid=()=> {
   
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
}

export const stipFileExt =(filename: string)=>{
  return filename.split('.').slice(0, -1).join('.')
}