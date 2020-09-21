import * as React               from 'react';
import { Container, Grid }      from '@material-ui/core';
import { makeStyles }           from '@material-ui/core/styles';
import      Header              from '../components/Header'
import      Sidebar             from '../components/SideBar'
import FileDropWebUi            from '../components/FileDropWebUi'
import Loader                   from '../components/Loader';

/** Main view of the application to display all the targeted use cases */
const useStyles = makeStyles((theme) => ({
     root:       {
         flexGrow:       1, 
     },
     fullWidth:{
         maxWidth:       '100%'
     },
     container:  {
         display:        'grid',
         gridGap:        theme.spacing(2),
     },
    gridItemRight:{
        position:       'relative'
    },
    gridItemLeft:{

    }
  }));
const { useState, useEffect } = React;
function ForensicWorkbench (){
    const classes = useStyles(); 
    const [showLoader, setShowLoader] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setShowLoader(false);
      },5000);
    }, []); 

    return(
        <div>     
            <Header showBack={false} ></Header>            
            <Container className={classes.fullWidth}>              
                <Grid container spacing={2}>
                    <Grid item xs={3} className={classes.gridItemLeft}>
                        <Sidebar></Sidebar>
                    </Grid>
                    <Grid item xs={9} className={classes.gridItemRight}>
                        
                        {showLoader  && <Loader/> }   
                        <FileDropWebUi 
                            iframeUrl = "https://forensic-workbench.com/"
                        />
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default ForensicWorkbench;
