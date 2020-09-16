import * as React               from 'react';
import { Container, Grid }      from '@material-ui/core';
import Iframe                   from 'react-iframe'
import { makeStyles }           from '@material-ui/core/styles';

/* TBD*/
const useStyles = makeStyles((theme) => ({
    root:       {
        flexGrow:       1, 
    },
    iframe:{
        border:         '1px solid #ccc',
        float:          'left'
    }
}));

type appLink = {
    iframeUrl: string
}

function FileDropWebUi({iframeUrl}:appLink){
    const classes = useStyles(); 
    return(
        <div>             
            <Container>
                <Grid>
                    <Iframe
                        url= {iframeUrl}
                        width="100%"
                        height="600"
                        className={classes.iframe}
                    ></Iframe>                                                              
                </Grid>
            </Container>
        </div>
        
    )
}

export default FileDropWebUi;