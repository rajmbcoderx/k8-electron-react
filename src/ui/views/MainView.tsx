import * as React                   from 'react';
import { makeStyles }               from '@material-ui/core/styles';
import      GitRepos                from '../components/GitRepos'
import      Footer                  from '../components/Footer'
import SideDrawer                   from '../components/SideDrawer';


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

function MainLayout (){
    const classes = useStyles(); 
    return(
        <div>
            <div className={classes.root}>     
                <SideDrawer showBack={false}/>
                <main className={classes.content}>
                <div className={classes.toolbar} />
                    <GitRepos></GitRepos>
                </main>
            </div>        
            <Footer/>
        </div>
    )
}

export default MainLayout;
