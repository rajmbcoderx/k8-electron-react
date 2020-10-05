import axios        from "axios";
import * as Utils   from '../utils/utils'

const getPayload = (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    console.log("File Size (MB) : " + size_of_file);
    var json = {
            fileSize : size_of_file,
            Base64 : data.content
          
        };
     return json;
}

const getAnalysisPayload = (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    //console.log("File Size (MB) : " + size_of_file);
    var json = {
            Base64 : data.content,
            fileSize : size_of_file,
        };
     return json;
}


const getLocalUpload = (data: any) => {
    return {"fileName":data.original_file_name,"fileBody":data.content};
}


export const makeRequest = (data: any, sourceFileUrl: string, requestId: string, folderId: string,
      resultCallback: Function, analysisResult: Function) => {

    let payload: string | any;
    let url : string;
    url = Utils.REBUILD_ENGINE_URL;

    payload = getPayload(data)
    var fileSize = payload.fileSize;
    // Files smaller than 6MB - Normal
    payload = JSON.stringify(payload)
    if(fileSize < 6){
        //console.log(payload)
        return axios.post(url, payload, {
                headers: {
                    "x-api-key": Utils.REBUILD_API_KEY,
                    "Content-Type": "application/json"
                }
            })
        .then((response) => {
            if(response.status === 200){
                getAnalysisResult(false, response.data, data, sourceFileUrl, requestId, folderId, resultCallback);
            }
        })
        .catch(err => {
            //console.log(JSON.stringify(err));
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':data.filename, isError:true,
              msg:err.message, id:requestId, targedDir:folderId})
        })
    }
    // 6 to 30 MB - S3 Presigned
    else if(fileSize < 30){
        axios.post(url+'uploadLocal', getLocalUpload(data), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        .then((response) => {
            // if(response.status === 200){
            //    // console.log("Successfully uploaded.Converting now");
            // }
            axios.post(url+'processFile', {"FileName": data.original_file_name}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if(response.status === 200){
                    //console.log("Successfully converted.Getting now");
                    return axios.get(url+'getFilePath', {
                        params: {
                            FileName: data.original_file_name
                        }
                    })
                    .then((response) => {
                        //console.log('Retrieved file:' + response.data)
                        getAnalysisResult(true, response.data, data, sourceFileUrl, requestId, folderId, resultCallback);
                    });
            }
            })
        .catch(err => {
            //console.log(JSON.stringify(err));
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':data.filename, isError:true,
              msg:err.message, id:requestId, targedDir:folderId})
        })
        })
        .catch(err => {
            //console.log(JSON.stringify(err));
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':data.filename, isError:true,
             msg:err.message, id:requestId, targedDir:folderId})
        })
    }
    else{
        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':data.filename, isError:true,
         msg:'File too big. 4 bytes to 30 MB file size bracket', id:requestId, targedDir:folderId})

    }
 
};


export const getAnalysisResult= async (isBinaryFile: boolean, base64OrBinary: any, data: any, sourceFile: string,
     requestId: string, targetFolder: string, resultCallback: Function)=>{
   

    let payload: string | any;
    let url : string;
    url = Utils.REBUILD_ANALYSIS_URL;

    payload = getAnalysisPayload(data)
    var fileSize = payload.fileSize;
    // Files smaller than 6MB - Normal
    payload = JSON.stringify(payload)
    //console.log("sleep starts")
    Utils.sleep(100);
    //console.log("sleep ends")
    if(fileSize < 6){
        return  axios.post(url, payload, {
                headers: {
                    "x-api-key": Utils.REBUILD_API_KEY,
                    "Content-Type": "application/json"
                }
            })
        .then((response) => {
            if(response.status === 200){
               if(isBinaryFile){
                    writeBinaryFile(base64OrBinary, response.data, data, sourceFile, requestId, targetFolder, resultCallback)
               }else{
                    writeDecodedBase64File(base64OrBinary, response.data, data, sourceFile, requestId,
                         targetFolder, resultCallback)
               }
            }
          
        })
        .catch(err => {
            //console.log(JSON.stringify(err));
            resultCallback({'source':sourceFile, 'url':'TBD', 'filename':data.filename, isError:true,
                 msg:err.message, id:requestId, targedDir:targetFolder})
        })
    }
    // 6 to 30 MB - S3 Presigned
    else if(fileSize < 30){
        axios.post(url+'uploadLocal', getLocalUpload(data), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        .then((response) => {
           
            axios.post(url+'processFile', {"FileName": data.original_file_name}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if(response.status === 200){
                    //console.log("Successfully converted.Getting now");
                    return axios.get(url+'getFilePath', {
                        params: {
                            FileName: data.original_file_name
                        }
                    })
                    .then((response) => {
                        //console.log('Retrieved file:' + response.data)
                        if(isBinaryFile){
                            writeBinaryFile(base64OrBinary, response.data, data, sourceFile, requestId,
                                 targetFolder, resultCallback)
                       }else{
                            writeDecodedBase64File(base64OrBinary, response.data, data, sourceFile,
                                 requestId, targetFolder, resultCallback)
                       }
             
                    });
            }
            })
        .catch(err => {
            //console.log(JSON.stringify(err));
            resultCallback({'source':sourceFile, 'url':'TBD', 'filename':data.filename, isError:true,
                 msg:err.message, id:requestId, targedDir:targetFolder})
        })
        })
        .catch(err => {
            //console.log(JSON.stringify(err));
            resultCallback({'source':sourceFile, 'url':'TBD', 'filename':data.filename, isError:true,
                 msg:err.message, id:requestId, targedDir: targetFolder})
   
        })
    }
    else{
        resultCallback({'source':sourceFile, 'url':'TBD', 'filename':data.filename, isError:true,
             msg:'File too big. 4 bytes to 30 MB file size bracket', id:requestId, targedDir:targetFolder})
   
    }
   
}

function decodeBase64Image(dataString: string) {
    let response: any;
    
    response = dataString.split(';base64,').pop();
    return response;
  }
const writeDecodedBase64File = (baseBase64String: string, xmlReport:string, data: any, sourceFileUrl: string,
     requestId:string, targetFolder: string, resultCallback: Function) => {
    var imageBuffer = decodeBase64Image(baseBase64String);
    var bs = atob(baseBase64String);
    var buffer = new ArrayBuffer(bs.length);
    var ba = new Uint8Array(buffer);
    for (var i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
    }
    var file = new Blob([ba], { type: data.type });
    var url = window.webkitURL.createObjectURL(file);
    //var file1 = new File([file], 'anish.anish', { type: data.type});
    resultCallback({'source':sourceFileUrl, 'url':url, 'filename':data.filename, isError:false, msg:'',
        imageBuffer:imageBuffer, xmlResult: xmlReport, id:requestId, targetDir:targetFolder, original:data.content})
    
}

const writeBinaryFile = (bytes: any,  xmlReport:string, data: any, sourceFileUrl: string, requestId: string,
     targetFolder:string, resultCallback: Function) => {
    var bs = bytes;
    var buffer = new ArrayBuffer(bs.length);
    var ba = new Uint8Array(buffer);
    for (var i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
    }
    var file = new Blob([ba], { type: data.type });
    var url = window.webkitURL.createObjectURL(file);
    resultCallback({'source':sourceFileUrl,  'url':url, 'filename':data.filename, isError: false, msg:'',
        xmlResult: xmlReport, id:requestId, targetDir:targetFolder, original:data.content })
   
}
 const getBase64 = (file: File) => {
    let res = new Promise(resolve => {
        var reader = new FileReader();
        reader.onload = function (event: any) {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
    return res;
}

 export const getFile = (file: File) => {
        return getBase64(file).then((result: any) => {
            var encodedImage = result;
            var data = {type:file.type, filename:file.name, originalFileSize:file.size, content:null};
            if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png")
                data.content = encodedImage.replace(/^data:image\/\w+;base64,/, "");
            else
                data.content = encodedImage.replace(/^data:.*?;base64,/, "")
            return data;
        });

}