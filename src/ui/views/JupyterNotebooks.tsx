import * as React               from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import SideDrawer               from '../components/SideDrawer';
import Footer                   from '../components/Footer';


/** Main view of the application to display all the targeted use cases */
const useStyles = makeStyles((theme) => ({
    root:       {
        display:        'flex', 
    },
    fullWidth:{
        maxWidth:       '100%'
    },
    container:  {
        display:        'grid',
        gridGap:        theme.spacing(2),
    },
    gridItemRight:{
        minHeight:      '86vh'
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
       padding:        theme.spacing(3),
       minHeight:      '90vh'
   },
 }));


function JupyterNotebooks(){
    const classes = useStyles(); 
    return(
        <div>     
            <div className={classes.root}>     
                <SideDrawer showBack={false}/>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <h2>TBD</h2>
                </main>
            </div>        
            <Footer/>
        </div>
        
    )
}

export default JupyterNotebooks;