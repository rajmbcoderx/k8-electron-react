import * as React               from 'react';
import { makeStyles }           from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root:       {
        flexGrow:       1, 
    },
    footerNav:{
        float:              'right',
        width:              '100%',
        textAlign:          'center',
        bottom:             '0',
        '& ul':{
            padding:        '0 30px 0 0',
            margin:         '0',
            display:        'flex',
            justifyContent: 'center'
        }
    },
    footerNavItem:{
        listStyle:          'none',
        position:           'relative',
        float:              'left',
        padding:            '10px 10px',
    },
    subnNav:{
        display:            'none',
        position:           'absolute',
        background:         '#0C3451',
        top:                '58px',
        right:              '0'
    },    
    navBtn:{
        background:         'transparent',
        border:             'none',           
        fontSize:           '13px',
        cursor:             'pointer',
        color:              '#0c3451',
        textDecoration:     'none',
        '&:focus':{
            border:         '0',
            outline:        '0'
        }     
    },
    subnNavItem:{
        float:              'left',
        color:              '#fff',
        textDecoration:     'none',
        fontSize:           '13px',
        borderTop:          '1px solid #fff',
        padding:            '10px 20px',
        boxSizing:          'border-box',
        '&:hover':{
            background:     '#144e78'
        }
        
    }, 
    version:{
        fontSize:           '12px'
    }
 }));
 

function Footer(){
    const classes = useStyles(); 
   return(
    <div className={classes.footerNav}>                
        <ul>
            <li className={classes.footerNavItem}> 
                <a className={classes.navBtn} href="https://github.com/k8-proxy/k8-proxy-desktop/blob/master/LICENSE"> View License</a>
            </li>
            <li className={classes.footerNavItem}> 
                <span className={classes.version}> Version 0.2.0</span>
            </li>   
        </ul>
    </div>
        
    )
}

export default Footer;