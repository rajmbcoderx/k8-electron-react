import * as React               from 'react';
import { Container, Grid }      from '@material-ui/core';
import { makeStyles }           from '@material-ui/core/styles';
import KeyboardArrowRightIcon   from '@material-ui/icons/KeyboardArrowRight';
import { Link}                  from 'react-router-dom'

/** Main view of the application to display all the targeted use cases */
const useStyles = makeStyles((theme) => ({
    root:       {
        flexGrow:       1, 
    },
    container:  {
        display:        'grid',
        gridGap:        theme.spacing(2),
    },
    gridItem:   {
      border:       '   1px solid lightblue',
      padding:          theme.spacing(2),
      boxShadow:        '1px 1px 2px #ccc',
      margin:           '20px 4%',
      borderRadius:     '5px',
      borderBottom:     '5px solid lightblue',
      position:         'relative'
    },
    gridkName:      {
        padding:        '0 20px'
    },    
    heading:        {
        marginBottom:   '10px'
    },
    paraContnet:    {
        margin:         '0 0 15px 0',
        fontSize:       '14px'
    },
    gridContainer:{},
    btnRight:{
        position:       'absolute',
        top:            '0px',
        right:          '0px',
        height:         '100%',
        border:         '0',
        color:          '#666',
        cursor:         'pointer',
        borderRight:    '1px solid lightblue',
        borderRadius:   '0 5px 5px 0',
    }
  }));

function MainLayout (){
    const classes = useStyles(); 
    return(
        <Container>
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={5}  className={classes.gridItem}>
                    <div className={classes.gridkName}>
                        <h4 className={classes.heading}>Git Browser</h4>
                        <p className={classes.paraContnet}>Browse the Open Source multiple repos</p>
                        <button className={classes.btnRight}><Link to="/gitBrowser"><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Link></button>
                    </div>
                </Grid>
                <Grid  item xs={5} className={classes.gridItem}>
                    <div className={classes.gridkName}>
                        <h4 className={classes.heading}>File-drop</h4>
                        <p className={classes.paraContnet}>Run a locally hosted version of https://file-drop.co.uk</p>
                        <button className={classes.btnRight}><Link to="/fileDrop"><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Link></button>                        
                    </div>
                </Grid>
                <Grid item xs={5} className={classes.gridItem}>
                    <div className={classes.gridkName}> 
                        <h4 className={classes.heading}>Dashboard Kubernetes pods</h4>
                        <p className={classes.paraContnet}>Open k8-* project UIsop level UI for the multiple UIs that we will have running inside Kubernetes pods </p>
                        <button className={classes.btnRight}><Link to=""><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Link></button>
                    </div>
                </Grid>
                <Grid item xs={5} className={classes.gridItem}>
                 <div className={classes.gridkName}>
                     <h4 className={classes.heading}>Slack UI for bots</h4>
                     <p className={classes.paraContnet}>replicate the Slack UI for bots (with the ability to scroll to previous commands)</p>
                     <button className={classes.btnRight}><Link to=""><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Link></button>
                </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MainLayout;
