import  React, {useState}       from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import Footer                   from '../components/Footer';
import Dropzone                 from "react-dropzone";
import FileCopyIcon             from '@material-ui/icons/FileCopy';
import DropIcon                 from '../assets/images/dropIcon.png'
import SideDrawer               from '../components/SideDrawer';
import * as FileUploadUtils     from '../components/FileUploadUtils'
import Loader                   from '../components/Loader';


const useStyles = makeStyles((theme) => ({
    root:       {   
        display:                    'flex', 
    },
    fullWidth:{
        maxWidth:                   '100%'
    },
    container:  {
        display:                    'grid',
        gridGap:                    theme.spacing(2),
    },
    gridItemRight:{
        minHeight:                  '86vh',
        paddingLeft:                '20px!important',

        '& h3':{
            color:                  '#0c3451',
            margin:                 '0 0 20px 0',
        }
    },
   gridItemLeft:{
   },
   dropzone:{
        border:                     '2px dashed #6ab8f0',
        borderRadius:               '35px',
        minHeight:                  '350px',
        display:                    'flex',
        justifyContent:             'center',
        marginBottom:               '20px',
        fontSize:                   '20px',
        alignItems:                 'center',    
        '& p':{
            textAlign:              'center',    
            fontSize:               '25px',
            color:                  '#0c3451'      
        } 
   },
   fileItems:{
        listStyle:                  'none',
        float:                      'left',
        padding:                    '0',
        width:                      '100%',
        '& li':{
            marginBottom:           '10px',
            float:                  'left',
            width:                  '100%',
            borderBottom:           '1px solid #ccc',
            paddingBottom:          '5px',

            '& a':{
                color:              '#0c3451',
                textDecoration:     'none',

                '&:hover':{
                    textDecoration: 'underline'
                }
            }
        }
   },
   icons:{
        fontSize:                   '100px',
        color:                      '#ccc',
        width:                      '80px',
        margin:                     '20px 0 30px 0',
   },
   fileIcon:{
        fontSize:                   '15px',
        float:                      'left',
        margin:                     '3px 6px 0 0',
        color:                      '#488acd'
   },
   dropField:{
        float:                      'left',
        width:                      '100%',
        textAlign:                  'center'
   },
   selectFileBtn:{
        display:                    'block',
        margin:                     '0px auto 30px auto',
        padding:                    '10px',
        minWidth:                   '154px',
        borderRadius:               '4px',
        border:                     '2px solid #6ab8f0',
        color:                      '#6ab8f0',
        background:                 '#fff'
   },
   errMsg:{
        color:                      'red',
        margin:                     '0px 0 10px 0',
        fontSize:                   '15px',
        display:                    'none',
        textAlign:                  'center'
},
    successMsg:{
        color:                      'green',
        margin:                     '0px 0 10px 0',
        fontSize:                   '15px',
        display:                    'none',
        textAlign:                  'center'
    },
    toolbar: {
         display:                   'flex',
         alignItems:                'center',
         justifyContent:            'flex-end',
         padding:                   theme.spacing(0, 1),
         ...theme.mixins.toolbar,
     },
     content: {
         flexGrow:                  1,
         padding:                   theme.spacing(3),
         minHeight:                 '90vh'
     },
 }));


function RebuildFiles(){
    
    const classes = useStyles(); 
    const [fileNames, setFileNames] = useState<Array<string>>([]);
    const [rebuildFileNames, setRebuildFileNames] = useState<Array<RebuildResult>>([]);
    const [showLoader, setShowLoader] = useState(false);  

    interface RebuildResult {
        url: string;
        name?: string;
      }
    const downloadResult =(result: any)=>{
        console.log("download" + result.url + " name" + result.filename);
        setRebuildFileNames(rebuildFileNames =>[...rebuildFileNames,  {
            url: result.url,
            name: result.filename
          }]);
          setShowLoader(false);
    //console.log(rebuildFileNames)
    }

    const handleDrop = async (acceptedFiles:any) =>{
        acceptedFiles.map(async (file: File) => {
            await FileUploadUtils.getFile(file).then((data: any) => {
                FileUploadUtils.makeRequest(data, downloadResult);
                setShowLoader(true);
            })
        })
    }   
  
    return(
        <div>                      
            <div className={classes.root}> 
                <SideDrawer showBack={false}/>
                <main className={classes.content}>
                    <div className={classes.toolbar} />                
                    <h3>Rebuild Files</h3>
                    <Dropzone onDrop={handleDrop} >
                        {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={classes.dropzone}>
                            <input {...getInputProps()} />
                                <div className={classes.dropField}>
                                <p>Drag and drop files</p>
                                <img src={DropIcon} className={classes.icons}/> 
                                <button className={classes.selectFileBtn}>Select files</button>
                            </div>
                        </div>
                        )}
                    </Dropzone>
                    <div className={classes.errMsg}> Failed to upload </div>
                    <div className={classes.successMsg}>File uploaded successuly </div>
                    <div>
                        {/* <strong>Uploaded Files:</strong>
                        <ul className={classes.fileItems}>
                            {fileNames.map(fileName => (
                                <li key={fileName}><FileCopyIcon className={classes.fileIcon}/> {fileName}</li>
                            ))}
                        </ul> */}
                        {showLoader  && <Loader/> }   
                        {rebuildFileNames.length>0 && 
                            <div>
                                <strong>Download Rebuild Files:</strong>
                                <ul className={classes.fileItems}>
                                    {rebuildFileNames.map((file: any, index:number) => (
                                         <li key={index+1}> <a id="download_link" href={file.url} download={file.name} ><FileCopyIcon className={classes.fileIcon}/> {file.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                </main>
            </div>                
            <Footer/>
        </div>
        
    )
}

export default RebuildFiles;