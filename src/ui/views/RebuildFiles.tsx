import  React, {useState}       from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import Footer                   from '../components/Footer';
import Dropzone                 from "react-dropzone";
import FileCopyIcon             from '@material-ui/icons/FileCopy';
import DropIcon                 from '../assets/images/dropIcon.png'
import SideDrawer               from '../components/SideDrawer';
import * as FileUploadUtils     from '../components/FileUploadUtils'
import Loader                   from '../components/Loader';
import * as Utils               from '../utils/utils'
import Table                    from '@material-ui/core/Table';
import TableBody                from '@material-ui/core/TableBody';
import TableCell                from '@material-ui/core/TableCell';
import TableContainer           from '@material-ui/core/TableContainer';
import TableHead                from '@material-ui/core/TableHead';
import TableRow                 from '@material-ui/core/TableRow';

var http = require('http');
var fs   = require('fs');


const useStyles = makeStyles((theme) => ({
    root:       {   
        display:                    'flex', 
    },
    table: {
        minWidth: 650,
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


 function createData(name:string, calories:number, fat:number, carbs:number, protein:number) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

function RebuildFiles(){
    
    const classes = useStyles(); 
    const [fileNames, setFileNames] = useState<Array<string>>([]);
    const [rebuildFileNames, setRebuildFileNames] = useState<Array<RebuildResult>>([]);
    const [counter, setCounter] = useState(0);
    const [name, setName] = useState("default");
    const [loader, setShowLoader] = useState(false);  

    interface RebuildResult {
        url: string;
        name?: string;
        msg?: string;
        isError?: boolean;
      }
    const downloadResult =(result: any)=>{
        console.log("download" + result.url + " name" + result.filename);
        setRebuildFileNames(rebuildFileNames =>[...rebuildFileNames,  {
            url: result.url,
            name: result.filename
          }]);
          setCounter(state=>state-1);
          console.log("__dirname:" + __dirname)
          fs.writeFile('./tmp/'+result.filename, result.imageBuffer, {encoding: 'base64'}, function(err: any) { if (err) {
            console.log('err', err);
        }
        console.log('success');});
    }

    


React.useEffect(() => {
    var dir = './tmp';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
   
  }, []);

    React.useEffect(() => {
        console.log("counter: " + counter)
        if (counter == 0 && loader == true) {
            setShowLoader(false);
        }
      }, [counter]);

    const handleDrop = async (acceptedFiles:any) =>{
        setCounter((state: any)=>state + acceptedFiles.length)
        setName("Anish");
        acceptedFiles.map(async (file: File) => {
            await FileUploadUtils.getFile(file).then((data: any) => {
                setFileNames((fileNames: any) =>[...fileNames, file.name]);
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
                        {loader  && <Loader/> }   
                        {rebuildFileNames.length>0 && 
                            <div>
                                <strong>Download Rebuild Files:</strong>
                                {/* <ul className={classes.fileItems}>
                                    {rebuildFileNames.map((file: any, index:number) => (
                                         <li key={index+1}> <a id="download_link" href={file.url} download={file.name} ><FileCopyIcon className={classes.fileIcon}/> {file.name}</a></li>
                                    ))}
                                </ul> */}
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Orginal</TableCell>
                                        <TableCell align="right">Rebuild</TableCell>
                                        <TableCell align="right">XML</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rebuildFileNames.map((row) => (
                                        <TableRow key={row.name}>
                                        <TableCell align="right">{row.isError == true?"Failed":"Success"}</TableCell>
                                        <TableCell align="right"><a id="download_link" href={row.url} download={row.name} ><FileCopyIcon className={classes.fileIcon}/> {row.name}</a></TableCell>
                                        <TableCell align="right"><a id="download_link" href={row.url} download={row.name} ><FileCopyIcon className={classes.fileIcon}/> {row.name}</a></TableCell>
                                        <TableCell align="right">{row.msg}</TableCell>
                                        <TableCell align="right">{new Date().toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
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