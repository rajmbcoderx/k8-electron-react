import  React, {useState}       from 'react';
import { makeStyles }           from '@material-ui/core/styles';

import Table                    from '@material-ui/core/Table';
import TableBody                from '@material-ui/core/TableBody';
import TableCell                from '@material-ui/core/TableCell';
import TableContainer           from '@material-ui/core/TableContainer';
import TableHead                from '@material-ui/core/TableHead';
import TableRow                 from '@material-ui/core/TableRow';
import DeleteIcon               from '@material-ui/icons/Delete';
import FolderIcon               from '@material-ui/icons/Folder';
import { CardActions,
        TablePagination 
    }                           from '@material-ui/core';
import Footer                   from '../components/Footer';
import Dropzone                 from "react-dropzone";
import FileCopyIcon             from '@material-ui/icons/FileCopy';
import DropIcon                 from '../assets/images/dropIcon.png'
import SideDrawer               from '../components/SideDrawer';
import * as FileUploadUtils     from '../components/FileUploadUtils'
import Loader                   from '../components/Loader';
import * as Utils               from '../utils/utils'
import RawXml                   from '../components/RawXml';



var child_process   =    require("child_process");
const path          = require('path');
var http            = require('http');
var fs              = require('fs');


const useStyles = makeStyles((theme) => ({
    root:       {   
        display:                    'flex', 
    },    
    table: {
        minWidth:                   650,
        '& td':{
            paddingTop:             '10px',
            paddingBottom:          '10px'
        }
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
    actions: {
        justifyContent: 'flex-end'
    },
   gridItemLeft:{
   },
   dropzone:{
        border:                     '2px dashed #6ab8f0',
        borderRadius:               '35px',
        minHeight:                  '300px',
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
    //  btnGroup:{
    //     margin:                     '10px 0',
    //     textAlign:                  'right',
    //     width:                      '100%',
    //     float:                      'left'
    //  },
     downloadLink:{
        maxWidth:                   '245px',
        display:                    'inline-block',
        textOverflow:               'ellipsis',
        whiteSpace:                 'nowrap',
        overflow:                   'hidden',
        color:                      '#575757;'
     },
     viewBtn:{
        color:                      '#fff',
        border:                     'none',
        padding:                    '7px 10px',
        fontSize:                   '12px',
        fontWeight:                 'normal',
        backgroundColor:            '#0c3451',
        borderRadius:               '3px',
     },
     deleteBtn:{
        background:                 '#1976D2',
        border:                     'none',
        borderRadius:               '3px',
        padding:                    '5px 15px',
        color:                      '#fff',
        fontSize:                   '13px',
        lineHeight:                 '25px',
        position:                   'absolute',
        left:                       '5px',
        marginTop:                  '10px',
        cursor:                     'pointer',
        transition:                 '0.5s',
        '&:hover':{ 
            background:             '#2389ee',
            transition:             '0.5s'
        },
        '&:focus':{ 
            outline:             '0'
        }
     },
     deleteBtnDisabled:{
        border:                    'none',
        borderRadius:              '3px',
        padding:                   '5px 15px',
        color:                     '#fff',
        fontSize:                  '13px',
        lineHeight:                '25px',
        background:                '#ddd',
        position:                  'absolute',
        left:                      '5px',
        marginTop:                 '10px',
    },
     outFolderBtn:{
        background:                 '#3cb371',
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '5px 15px',
        fontSize:                   '13px',
        lineHeight:                 '25px',
        float:                      'right',
        cursor:                     'pointer',
        transition:                 '0.5s',
        '&:hover':{ 
            background:             '#3fc87c',
            transition:             '0.5s'
        },
        '&:focus':{ 
            outline:             '0'
        }
     },
     outFolderBtnDissabled:{
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '5px 15px',
        fontSize:                   '13px',
        lineHeight:                 '25px',
        background:                 '#ddd'
     },
     btnIcon:{
        float:                      'left',
        fontSize:                   '22px',
        marginRight:                '5px'
     },
     status:{
        '& p':{
            color:                  '#098c44',
            fontWeight:             'bold'
        },
        '& span':{
            color:                  '#ff0000',
            fontWeight:             'bold'
        }
     },
     tableField:{
         position:                  'relative',
        '& h3':{
            background:             '#003962',
            borderRadius:           '3px',
            float:                  'left',
            width:                  '100%',
            borderTop:              '1px solid #ccc',
            borderBottom:           '1px solid #ccc',
            padding:                '5px 5px 5px 10px',
            color:                  '#fff',
            marginBottom:           '5px',
            lineHeight:             '35px',
            fontWeight:             'normal'
        }
    },
    texttBold:{
        fontWeight:                 'bold',
        fontSize:                   '15px'
    },
    settings:{
        borderBottom:               '1px solid #ccc',
        paddingBottom:              '20px',
        float:                      'left',
        width:                      '100%',
        // '& h2':{
        //     float:                  'left',
        //     width:                  '100%',
        //     color:                  '#003962',
        //     fontSize:               '17px',
        //     borderBottom:           '1px solid #ccc'
        // },
        '& h4':{
            fontSize:               '14px',
            color:                  '#003962',
            margin:                 '15px 0'
        }        
    },
    btnHeading:{
        float:                      'left',
        width:                      '100%',
    },
    fileType:{
        float:                      'left',
        width:                      '100%'
    },
    saveFileBtn:{
        '& button':{
            background:              '#084d94',
            border:                  'none',
            color:                   '#fff',
            borderRadius:            '3px',
            padding:                 '5px 15px',
            fontSize:                '13px',
            lineHeight:              '25px',
            float:                   'left',
            cursor:                  'pointer',
            transition:              '0.5s',
            marginRight:             '10px',
            '&:hover':{ 
                background:          '#0f59a5',
                transition:          '0.5s'
            },
            '&:focus':{ 
                outline:             '0'
            }
        },        
        '& input':{
            border:                 '1px solid #ccc',
            padding:                '9px',
            borderRadius:           '3px',
            float:                  'left',
            minWidth:               'calc(100% - 200px)',
            marginRight:            '12px'
        }
    },
    fileOption:{
        float:                      'left',
        '& input':{
            marginRight:            '15px'
        },
        '& span':{            
            fontSize:               '16px',
            marginRight:            '10px'
        }
    }
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
    const [fileNames, setFileNames]                 = useState<Array<string>>([]);
    const [rebuildFileNames, setRebuildFileNames]   = useState<Array<RebuildResult>>([]);
    const [counter, setCounter]                     = useState(0);
    const [loader, setShowLoader]                   = useState(false);  
    const [id, setId]                               = useState("");  
    const [open, setOpen]                           = useState(false);  
    const [xml, setXml]                             = useState("");  
    const [page, setPage]                           = useState(0); 
    const [rowsPerPage, setRowsPerPage]             = useState(10);  
    const [folderId, setFolderId]                   = useState("");  
    const [targetDir, setTargetDir]                 = useState("");  


    interface RebuildResult {
        id:             string,
        sourceFileUrl:  string;
        url:            string;
        name?:          string;
        msg?:           string;
        isError?:       boolean;
        xmlResult:      string;
      }

    const downloadResult =(result: any)=>{

        setRebuildFileNames(rebuildFileNames =>[...rebuildFileNames,  {
            id:result.id,
            url: result.url,
            name: result.filename,
            sourceFileUrl: result.source,
            isError: result.isError,
            msg: result.msg,
            xmlResult:result.xmlResult
          }]);
          setCounter(state=>state-1);
          if(!result.isError){
                var dir = './tmp/'+result.targetDir +'/clean/';
                fs.writeFile(dir+ result.filename, result.imageBuffer, {encoding: 'base64'}, function(err: any) { if (err) {
                            console.log('err', err);
                    }
                  
                });
                saveOriginalFile(result.original, result.targetDir, result.filename);
                saveXMLFile(result.xmlResult, result.targetDir, result.filename);
            }
        
    }

    const saveOriginalFile = async (original: string, targetDir: string, filename: string) =>{

        var dir = './tmp/'+targetDir +'/original/'+filename;
        fs.writeFile(dir, original, {encoding: 'base64'}, function(err: any) { if (err) {
                    console.log('err', err);
            }
            
        });
    }

    const saveXMLFile = async (xmlContent: string, targetDir: string, filename: string) =>{

        var dir = './tmp/'+targetDir +'/xml/';
        fs.writeFile(dir+ Utils.stipFileExt(filename)+'.xml', xmlContent, function(err: any) {
             if (err) {
                    console.log('err', err);
            }
           
        });
    }

    

    const analysisResult=(error: boolean, id: string, xmlResult: string, result: any )=>{
        if(!error){
            let newArr: RebuildResult[] | undefined;
            let foundIndex: number;

            newArr = [...rebuildFileNames]; // copying the old datas array
            foundIndex = rebuildFileNames.findIndex((rebuildFile) => rebuildFile.id === id);

            let newRebuildObject: RebuildResult| undefined;
            newRebuildObject = rebuildFileNames.find((rebuildFile) => rebuildFile.id === id);
            if(newRebuildObject ) {
                newRebuildObject.xmlResult = xmlResult;
                newArr[foundIndex] = newRebuildObject;
                setRebuildFileNames(newArr);
            }
 
        }
    }
 
    React.useEffect(() => {
        if(folderId!=''){
            var dir = './tmp/'+folderId +'/clean/';
            var malicious = './tmp/'+folderId +'/original/';
            var xml = './tmp/'+folderId +'/xml/';
            if (!fs.existsSync(dir)){
                fs.promises.mkdir(dir, { recursive: true });
            }
            if (!fs.existsSync(malicious)){
                fs.promises.mkdir(malicious, { recursive: true });
            }
            if (!fs.existsSync(xml)){
                fs.promises.mkdir(xml, { recursive: true });
            }
            setTargetDir(dir);
        }
    }, [folderId]);

    React.useEffect(() => {
        if (counter == 0 && loader == true) {
            setShowLoader(false);
        }
      }, [counter]);

    const handleDrop = async (acceptedFiles:any) =>{
        let outputDirId: string;

        setCounter((state: any)=>state + acceptedFiles.length)
        setRebuildFileNames([]);
        outputDirId = Utils.guid()
        setFolderId(outputDirId);

        acceptedFiles.map(async (file: File) => {
            await FileUploadUtils.getFile(file).then((data: any) => {
                setFileNames((fileNames: any) =>[...fileNames, file.name]);
                var url = window.webkitURL.createObjectURL(file);
                let guid: string;
                guid =  Utils.guid();
                Utils.sleep(100);
                FileUploadUtils.makeRequest(data, url, guid, outputDirId, downloadResult, analysisResult);
                setShowLoader(true);
            })
        })
    }  
    
    React.useEffect(() => {
        let rebuildFile: RebuildResult| undefined;
        rebuildFile = rebuildFileNames.find((rebuildFile) => rebuildFile.id ==id);
        if(rebuildFile){
            setXml(rebuildFile.xmlResult);
          }
         }, [id, xml, open]);


    const viewXML =(id: string)=>{
        console.log(id)
        setId(id);
        setOpen(!open);
      
    }
  
    const openXml =(open:boolean)=>{
        setOpen(open);
    }

    function open_file_exp(fpath: string) {
        var command = '';
        switch (process.platform) {
          case 'darwin':
            command = 'open -R ' + fpath;
            break;
          case 'win32':
            if (process.env.SystemRoot) {
              command = path.join(process.env.SystemRoot, 'explorer.exe');
            } else {
              command = 'explorer.exe';
            }
            fpath = fpath.replace(/\//g, '\\');
            command += ' /select, ' + fpath;
            break;
          default:
            fpath = path.dirname(fpath)
            command = 'xdg-open ' + fpath;
        }
        //console.log(command);
        child_process.exec(command, function(stdout:any) {
        });
      }

      const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    

    //   let files = (rowsPerPage > 0
    //     ? rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //     : rows)

    const clearAll =()=>{
        setRebuildFileNames([])
    }

    return(
        <div>   
            {open && <RawXml content={xml} isOpen={open} handleOpen={openXml}/>   }                
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
                   
                        {loader  && <Loader/> }   
                        {rebuildFileNames.length>0 && 
                            <div className={classes.tableField}>
                                <div className={classes.settings}>  
                                    {/* <h2>Settings</h2> */}
                                    <div className={classes.btnHeading}>                                                                           
                                        <h4>Select Directory Path</h4>
                                        <div className={classes.saveFileBtn}>
                                            <input type="text" placeholder="Directory Path"/>
                                            <button> <FolderIcon className={classes.btnIcon}/> Choose out directory</button>
                                        </div>
                                    </div>
                                    <div className={classes.fileType}>
                                        <h4>Folder Type</h4>
                                        <div className={classes.fileOption}>
                                            <input type="radio" value="flat" name="fileoption"/>
                                            <span>Flat</span>
                                        </div>
                                        <div className={classes.fileOption}>
                                            <input type="radio" value="hierarchy" name="fileoption"/>
                                            <span>Hierarchy</span>
                                        </div>
                                    </div>
                                 </div>

                                <h3>Rebuild Files
                                    <button onClick={()=>open_file_exp(targetDir)} className={rebuildFileNames.length>0? classes.outFolderBtn:classes.outFolderBtnDissabled}><FolderIcon className={classes.btnIcon}/> Browse Output Folder</button>
                                </h3>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.texttBold}>Status</TableCell>
                                        <TableCell align="left" className={classes.texttBold}>Original</TableCell>
                                        <TableCell align="left" className={classes.texttBold}>Rebuilt</TableCell>
                                        <TableCell align="left" className={classes.texttBold}>XML</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rebuildFileNames.map((row) => (
                                        <TableRow key={row.name}>
                                        <TableCell align="left" className={classes.status}>{row.isError == true? <span>Failed</span>:<p>Success</p>}</TableCell>
                                        <TableCell align="left"><a id="download_link" href={row.sourceFileUrl} download={row.name} className={classes.downloadLink} title={row.name}><FileCopyIcon className={classes.fileIcon}/> {row.name}</a></TableCell>
                                        {
                                            !row.isError ?
                                                <TableCell align="left"><a id="download_link" href={row.url} download={row.name} className={classes.downloadLink} title={row.name}><FileCopyIcon className={classes.fileIcon}/>{row.name}</a></TableCell>
                                                : <TableCell align="left">{row.msg}</TableCell>
                                        }
                                         {
                                            !row.isError ?
                                            <TableCell align="left"><button  onClick={() => viewXML(row.id)} className={classes.viewBtn}>{!row.isError?'View Report':''}</button></TableCell>
                                                : <TableCell align="left"></TableCell>
                                        }
                                             
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                <button onClick={clearAll} className={rebuildFileNames.length>0?classes.deleteBtn:classes.deleteBtnDisabled}><DeleteIcon className={classes.btnIcon}/> Clear All</button>
                            </div>
                        }
                        {
                        rebuildFileNames.length>0 &&
                         <CardActions className={classes.actions}>
                             <TablePagination
                                  onChangePage        ={handleChangePage }
                                  onChangeRowsPerPage ={handleChangeRowsPerPage}
                                  component           ="div"
                                  count               ={rebuildFileNames.length                   }
                                  page                ={page                           }
                                  rowsPerPage         ={rowsPerPage                    }
                                  rowsPerPageOptions  ={[5, 10, 25, { label: 'All', value: -1 }]     }               
                                  SelectProps         ={{
                                                          inputProps: { 'aria-label': 'rows per page' },
                                                          native: true,
                                                        }}
                              />
                          </CardActions> 
                          }
                    </div>
                </main>
            </div>                
            <Footer/>
        </div>
        
    )
}

export default RebuildFiles;