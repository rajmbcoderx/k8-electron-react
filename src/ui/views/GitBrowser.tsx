import * as React                       from 'react';
import { Container, List, ListItem }    from '@material-ui/core';
import { makeStyles }                   from '@material-ui/core/styles';
import ArrowRightIcon                   from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
    listContainer:{
        borderTop:      '2px solid #0c80d5',
        padding:        theme.spacing(2),
        position:       'relative'
    },
    urlList:{        
        color:          '#0c3451',
        width:          '300px',
        textDecoration: 'none',
        borderBottom:   '1px solid #ccc',
        padding:        '10px 0 10px 3px',
        fontWeight:     'bold',
        fontSize:       '14px',
        
    },
    heading:{
        margin:         '0px 0 20px 0',
        float:          'left',
        width:          '100%'
    },
    listItem:{
        width:          '50%',
        float:          'left',
        marginTop:      '10px'
    }
   
  }));

function GitRepos(){
    const classes = useStyles();
    return(
        <div>
             {/* <Header showBack={true} ></Header> */}
            <Container>            
                <h2 className={classes.heading}>Here are the Open Source projects we are funding via Upwork</h2>
                <p>Select the repo you want to visit</p>
                <List className={classes.listContainer}>              
                    <ListItem className={classes.listItem}><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/Open-Source/blob/master/upwork/project-k8-glasswall-rebuild">K8 Glasswall Rebuild</a></ListItem>
                    <ListItem className={classes.listItem}><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-data-visualization">k8-data-visualization</a></ListItem>
                    <ListItem className={classes.listItem}><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-glasswall-rebuild">k8-glasswall-rebuild</a></ListItem>
                    <ListItem className={classes.listItem}><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-reverse-proxy">k8-reverse-proxy</a></ListItem>
                    <ListItem className={classes.listItem}><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-traffic-generator">k8-traffic-generator</a></ListItem>
                    <ListItem className={classes.listItem}><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-performance-use-cases">k8-performance-use-cases</a></ListItem>
                    <ListItem className={classes.listItem}><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-test-data">k8-test-data</a></ListItem>
                    <ListItem className={classes.listItem}><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href=" https://github.com/filetrust/rebuild-k8s-filetypedetection">rebuild-k8s-filetypedetection</a></ListItem>
                </List>
            </Container>
        </div>
    )
}

export default GitRepos;