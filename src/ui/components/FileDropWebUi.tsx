import * as React               from 'react';
import { Container, Grid }      from '@material-ui/core';
import Iframe                   from 'react-iframe'

/* TBD*/

function FileDropWebUi(){
    return(
        <div>             
            <Container>
                <Grid>
                    <Iframe
                        url="https://file-drop.co.uk/"
                        width="100%"
                        height="600"
                        id="myId"
                        className="iframe"
                    ></Iframe>
                </Grid>
            </Container>
        </div>
        
    )
}

export default FileDropWebUi;