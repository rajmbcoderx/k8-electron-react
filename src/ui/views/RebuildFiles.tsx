import  React, {useState}       from 'react';
import { Container, Grid }      from '@material-ui/core';
import { makeStyles }           from '@material-ui/core/styles';
import Header                   from '../components/Header';
import Sidebar                  from '../components/SideBar'
import Footer                   from '../components/Footer';
import CloudDownloadIcon        from '@material-ui/icons/CloudDownload';
import Dropzone                 from "react-dropzone";
import FileCopyIcon             from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
    root:       {
        flexGrow:       1, 
    },
    fullWidth:{
        maxWidth:       '100%'
    },
    container:  {
        display:            'grid',
        gridGap:            theme.spacing(2),
    },
    gridItemRight:{
        minHeight:          '86vh',
        paddingLeft:        '20px!important'
    },
   gridItemLeft:{
   },
   dropzone:{
        border:             '1px solid #ccc',
        borderRadius:       '5px',
        minHeight:          '300px',
        display:            'flex',
        justifyContent:     'center',
        marginBottom:       '20px',
        alignItems:         'center',    
        '& p':{
            textAlign:      'center',            
        } 
   },
   fileItems:{
        listStyle:          'none',
        float:              'left',
        padding:            '0',
        width:              '100%',
        '& li':{
            marginBottom:   '10px',
            float:          'left',
            width:          '100%',
            borderBottom:   '1px solid #ccc',
            paddingBottom:  '5px'
        }
   },
   icons:{
        fontSize:           '100px',
        color:              '#ccc',
        width:              '100%'
   },
   fileIcon:{
        fontSize:           '15px',
        float:              'left',
        margin:             '4px',
        color:              '#488acd'
   }
 }));


function RebuildFiles(){
    const classes = useStyles(); 
    const [fileNames, setFileNames] = useState([]);
    const handleDrop = (acceptedFiles:any) =>
    setFileNames(acceptedFiles.map((file: { name: any; }) => file.name));
    return(
        <div>     
        <Header showBack={false} ></Header>            
        <Container className={classes.fullWidth}>              
            <Grid container spacing={2}>
                <Grid item xs={3} className={classes.gridItemLeft}>
                    <Sidebar></Sidebar>
                </Grid>
                <Grid item xs={9} className={classes.gridItemRight}>
                    <h2>Rebuild Files</h2>
                         <Dropzone onDrop={handleDrop} >
                            {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className={classes.dropzone}>
                                <input {...getInputProps()} />
                                <p><CloudDownloadIcon className={classes.icons}/>Drag'n'drop files, or click to select files</p>
                            </div>
                            )}
                        </Dropzone>
                        <div>
                        <strong>Files:</strong>
                        <ul className={classes.fileItems}>
                        {fileNames.map(fileName => (
                            <li key={fileName}><FileCopyIcon className={classes.fileIcon}/> {fileName}</li>
                        ))}
                        </ul>
                    </div>
                </Grid>
            </Grid>
        </Container>
        <Footer/>
    </div>
        
    )
}

export default RebuildFiles;