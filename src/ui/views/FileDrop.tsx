import * as React               from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import WebIFrameView            from '../components/WebIFrameView'
import { useState, useEffect }  from 'react';
import Loader                   from '../components/Loader';
import Footer                   from '../components/Footer';
import FileDropSampleFiles      from './FileDropSampleFiles';
import * as Utils               from '../utils/utils';
import SideDrawer               from '../components/SideDrawer';


const useStyles = makeStyles((theme) => ({
     root:       {
         
         display:                'flex',
     },
     fullWidth:{
         maxWidth:       '100%'
     },
     container:  {
         display:        'grid',
         gridGap:        theme.spacing(2),
     },
    gridItemRight:{
        position:        'relative'
    },
    gridItemLeft:{
    },
    toolbar: {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'flex-end',
        padding:        theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow:       1,
        padding:        theme.spacing(2),
        minHeight:      '90vh'
    },
  }));

function FileDrop (){
    const classes = useStyles();    
    const [showLoader, setShowLoader] = useState(true);  
    useEffect(() => {
      setTimeout(() => { setShowLoader(false);},500);
    }, []); 

    return(
        <div>
            <div className={classes.root}>        
                <SideDrawer showBack={false}/>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <FileDropSampleFiles/>
                    {showLoader  && <Loader/> }  
                    <WebIFrameView url = {Utils.FILE_DROP_URL} />
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default FileDrop;
