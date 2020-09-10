import * as React               from 'react';
import { Container, Grid }      from '@material-ui/core';
import { makeStyles }           from '@material-ui/core/styles';
import KeyboardArrowRightIcon   from '@material-ui/icons/KeyboardArrowRight';
import { Link}                  from 'react-router-dom'
import gitIcon                      from '../assets/images/git.jpg'
import desktopApp               from '../assets/images/desktop.png'
import FileDropIcon             from '../assets/images/fileDrop.jpg'
import Slack                    from '../assets/images/slack.png'
import      Header                from '../components/Header'
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
      border:       '   1px solid #0c80d5',
      padding:          theme.spacing(2),
      boxShadow:        '0px 4px 6px #aaa',
      margin:           '30px 4%',
      borderRadius:     '5px',
      borderBottom:     '5px solid #0c80d5',
      position:         'relative'
    },
    gridkName:      {
        padding:        '0 20px'
    },    
    heading:        {
        marginBottom:   '3px',
        float:          'left',
        width:          '100%',
        lineHeight:     '34px'
    },
    paraContnet:    {
        margin:         '0 0 15px 0',
        fontSize:       '14px',
        lineHeight:     '24px',
        width:          '100%',
        float:          'left',
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
        background:     '#fff'
    },
    icons:{
        width:          '40px',
        float:          'left',
        marginRight:    '13px',
        maxWidth:       '100%'
    }, 
    btnIcon:{
        color:          '#2089d6',
        margin:         '0 10px'
    },
    leftImg:{
        float:          'left',
        margin:         '20px 0'                    
    },
    rightGrid:{
        float:          'left',
        marginLeft:     '5px',
        width:          'calc(100% - 90px)'
    }
  }));

function MainLayout (){
    const classes = useStyles(); 
    return(
        <div>     
            <Header showBack={false} ></Header>            
            <Container>
                <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item xs={5}  className={classes.gridItem}>
                        <div className={classes.gridkName}>
                            <div className={classes.leftImg}>
                                <img src={gitIcon} className={classes.icons}></img> 
                            </div>
                            <div className={classes.rightGrid}>
                                <h3 className={classes.heading}> Git Browser</h3>
                                <p className={classes.paraContnet}>Browse the Open Source multiple repos</p>
                                <button className={classes.btnRight}><Link to="/gitBrowser" className={classes.btnIcon}><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Link></button>
                            </div>
                        </div>
                    </Grid>
                    <Grid  item xs={5} className={classes.gridItem}>
                        <div className={classes.gridkName}>
                            <div className={classes.leftImg}>
                                <img src={FileDropIcon} className={classes.icons}></img>
                            </div>
                            <div className={classes.rightGrid}>
                                <h3 className={classes.heading}>  File-drop</h3>
                                <p className={classes.paraContnet}>Run a locally hosted version of https://file-drop.co.uk</p>
                                <button className={classes.btnRight}><Link to="/msgPasg"   className={classes.btnIcon}><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Link></button>                        
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={5} className={classes.gridItem}>
                        <div className={classes.gridkName}> 
                            <div className={classes.leftImg}>                                
                            <img src={desktopApp} className={classes.icons}></img>
                            </div>
                            <div className={classes.rightGrid}>
                                <h3 className={classes.heading}>Dashboard Kubernetes pods</h3>
                                <p className={classes.paraContnet}>Open k8-* project UIsop level UI for the multiple UIs that we will have running inside Kubernetes pods </p>
                                <button className={classes.btnRight}><Link to="/msgPasg"  className={classes.btnIcon}><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Link></button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={5} className={classes.gridItem}>
                        <div className={classes.gridkName}>
                            <div className={classes.leftImg}>     
                                <img src={Slack} className={classes.icons}></img>
                            </div>
                            <div className={classes.rightGrid}>
                                <h3 className={classes.heading}>Slack UI for bots</h3>
                                <p className={classes.paraContnet}>replicate the Slack UI for bots (with the ability to scroll to previous commands)</p>
                                <button className={classes.btnRight}><Link to="/msgPasg"  className={classes.btnIcon}><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Link></button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default MainLayout;
