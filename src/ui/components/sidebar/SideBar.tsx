import * as React               from 'react';
import {Paper , MenuItem }      from '@material-ui/core';
import { makeStyles }           from '@material-ui/core/styles';
import { NavLink}               from 'react-router-dom'
import gitIcon                  from '../../assets/images/git.jpg'
import desktopApp               from '../../assets/images/desktop.png'
import FileDropIcon             from '../../assets/images/fileDrop.jpg'
import Slack                    from '../../assets/images/slack.png'
/** Main view of the application to display all the targeted use cases */
const useStyles = makeStyles((theme) => ({
    root:       {
        flexGrow:       1, 
    },
    container:  {
        display:        'grid',
        gridGap:        theme.spacing(2),
    },
    menuItem:   {
      borderBottom:     '1px solid #ccc',  
      padding:          '0'    
    },
    menuName:      {
      float:            'left',
      width:            '100%'  
    },    
    heading:        {
        marginBottom:   '3px',
        float:          'left',
        width:          '100%',
        lineHeight:     '34px',
        color:          '#333',
        fontSize:       '15px'
    },
    paraContnet:    {
        margin:         '0 0 15px 0',
        fontSize:       '14px',
        lineHeight:     '24px',
        width:          '100%',
        float:          'left',
        whiteSpace:     'break-spaces'
    }, 
    icons:{
        width:          '25px',
        float:          'left',
        marginRight:    '13px',
        maxWidth:       '100%',
    },
    leftImg:{
        float:          'left',
        margin:         '20px 0 20px 5px'                    
    },
    rightGrid:{
        float:          'left',
        marginLeft:     '5px',
        width:          'calc(100% - 50px)'
    },
    active:{
        background:      '#ddd',
        width:           '100%'
    }
  }));
  

function MainLayout (){
    const classes = useStyles(); 
    return(
        <Paper>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/home" activeClassName={classes.active}>
                    <div className={classes.menuName}>
                        <div className={classes.leftImg}>
                            <img src={gitIcon} className={classes.icons}></img> 
                        </div>
                        <div className={classes.rightGrid}>
                            <h3 className={classes.heading}> Git Browser</h3>
                            {/* <p className={classes.paraContnet}>Browse the Open Source multiple repos</p>                                */}
                        </div>
                    </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/fileDrop"  activeClassName={classes.active}>
                    <div className={classes.menuName}>
                        <div className={classes.leftImg}>
                            <img src={FileDropIcon} className={classes.icons}></img>
                        </div>
                        <div className={classes.rightGrid}>
                            <h3 className={classes.heading}>  File-drop</h3>
                            {/* <p className={classes.paraContnet}>Run a locally hosted version of https://file-drop.co.uk</p> */}
                        </div>
                    </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/home1" activeClassName={classes.active}>
                <div className={classes.menuName}> 
                    <div className={classes.leftImg}>                                
                    <img src={desktopApp} className={classes.icons}></img>
                    </div>
                    <div className={classes.rightGrid}>
                        <h3 className={classes.heading}>Dashboard Kubernetes pods</h3>
                        {/* <p className={classes.paraContnet}>Open k8-* project UIsop level UI for the multiple UIs that we will have running inside Kubernetes pods </p>                                 */}
                    </div>
                </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/home2" activeClassName={classes.active}>
                <div className={classes.menuName}>
                    <div className={classes.leftImg}>     
                        <img src={Slack} className={classes.icons}></img>
                    </div>
                    <div className={classes.rightGrid}>
                        <h3 className={classes.heading}>Slack UI for bots</h3>
                        {/* <p className={classes.paraContnet}>replicate the Slack UI for bots (with the ability to scroll to previous commands)</p>                               */}
                    </div>
                </div>
                </NavLink>
            </MenuItem>
        </Paper >
    )
}

export default MainLayout;
