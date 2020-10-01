import axios        from "axios";
import * as Utils   from '../utils/utils'

const getPayload = (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    //this.setState({fileSize: size_of_file});
    console.log("File Size (MB) : " + size_of_file);
    var json = {
            fileSize : size_of_file,
            Base64 : data.content,
            ContentManagementFlags :{
                PdfContentManagement: {
                    Metadata: 0,
                    InternalHyperlinks: 0,
                    ExternalHyperlinks: 0,
                    EmbeddedFiles: 0,
                    EmbeddedImages: 0,
                    Javascript: 0,
                    Acroform: 0,
                    ActionsAll: 0
                },
                ExcelContentManagement: {
                    Metadata: 0,
                    InternalHyperlinks: 0,
                    ExternalHyperlinks: 0,
                    EmbeddedFiles: 0,
                    EmbeddedImages: 0,
                    DynamicDataExchange: 0,
                    Macros: 0,
                    ReviewComments: 0
                },
                PowerPointContentManagement: {
                    Metadata: 0,
                    InternalHyperlinks: 0,
                    ExternalHyperlinks: 0,
                    EmbeddedFiles: 0,
                    EmbeddedImages: 0,
                    Macros: 0,
                    ReviewComments: 0

                },
                WordContentManagement: {
                    Metadata: 0,
                    InternalHyperlinks: 0,
                    ExternalHyperlinks: 0,
                    EmbeddedFiles: 0,
                    EmbeddedImages: 0,
                    DynamicDataExchange: 0,
                    Macros: 0,
                    ReviewComments: 0
                }
            }
        };
     return json;
}


const getLocalUpload = (data: any) => {
    return {"fileName":data.original_file_name,"fileBody":data.content};
}



export const makeRequest = (data: any, resultCallback: Function) => {
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
            //Loader.hideLoader();

            if(response.status === 200){
                //this.setState({rebuild_file: response.data})
                alert("Successfully Rebuild");
                writeDecodedBase64File(response.data, data, resultCallback)
            }
            //this.setState({status:response.status, message:"Success"})
            //resultCallback
        })
        .catch(err => {
            //Loader.hideLoader();
            console.log(JSON.stringify(err));
            alert(err.message);
            //this.setState({status:-1, message: err.message});
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
            if(response.status === 200){
                console.log("Successfully uploaded.Converting now");
            }
            axios.post(url+'processFile', {"FileName": data.original_file_name}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if(response.status === 200){
                    console.log("Successfully converted.Getting now");
                    return axios.get(url+'getFilePath', {
                        params: {
                            FileName: data.original_file_name
                        }
                    })
                    .then((response) => {
                        console.log('Retrieved file:' + response.data)
                        //this.setState({rebuild_file: response.data})
                        //this.writeDecodedBase64File(Buffer.from(response.data, 'base64'))
                        writeBinaryFile(response.data, data, resultCallback)
                        alert("Successfully converted");
                        //Loader.hideLoader();
                    });
            }
            //this.setState({status:response.status, message:"Success"})
                //resultCallback
            })
        .catch(err => {
            //Loader.hideLoader();
            console.log(JSON.stringify(err));
            alert(err.message);
            //this.setState({status:-1, message: err.message});
        })
        //this.setState({status:response.status, message:"Success"})
            //resultCallback
        })
        .catch(err => {
            //Loader.hideLoader();
            console.log(JSON.stringify(err));
            alert(err.message);
            //this.setState({status:-1, message: err.message});
        })
    }
    else{
        alert('File too big. 4 bytes to 30 MB file size bracket');
    }
};

const writeDecodedBase64File = (baseBase64String: string, data: any, resultCallback: Function) => {
    var bs = atob(baseBase64String);
    var buffer = new ArrayBuffer(bs.length);
    var ba = new Uint8Array(buffer);
    for (var i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
    }
    var file = new Blob([ba], { type: data.type });
    var url = window.webkitURL.createObjectURL(file);
    console.log("writeDecodedBase64File url" + url)
    resultCallback({'url':url, 'filename':data.filename })
    //document.getElementById('download_link').href = url;
    //document.getElementById('download_link').download = this.state.filename;
    //this.setState({rebuildFileType : file.type, rebuildFileSize : baseBase64String.length})
}

const writeBinaryFile = (bytes: any, data: any, resultCallback: Function) => {
    var bs = bytes;
    var buffer = new ArrayBuffer(bs.length);
    var ba = new Uint8Array(buffer);
    for (var i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
    }
    var file = new Blob([ba], { type: data.type });
    var url = window.webkitURL.createObjectURL(file);
    console.log("writeBinaryFile: url" + url)
    resultCallback({'url':url, 'filename':data.filename })
    // document.getElementById('download_link').href = url;
    // document.getElementById('download_link').download = this.state.filename;
    // this.setState({rebuildFileType : file.type, rebuildFileSize : bs.length})
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
            //this.setState({type:file.type, filename:file.name, originalFileSize:file.size})
            if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png")
                data.content = encodedImage.replace(/^data:image\/\w+;base64,/, "");
            else
                data.content = encodedImage.replace(/^data:.*?;base64,/, "")
            return data;
        });

    }