import * as React                       from 'react';
import { Container, List, ListItem }    from '@material-ui/core';
import { makeStyles }                   from '@material-ui/core/styles';
import ArrowRightIcon                   from '@material-ui/icons/ArrowRight';
import ArrowBackIcon                    from '@material-ui/icons/ArrowBack';
import {Link}                           from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    listContainer:{
        border:         '1px solid lightblue',
        padding:        theme.spacing(2),
        boxShadow:      '1px 1px 2px #ccc',
        borderRadius:   '5px',
        position:       'relative'
    },
    urlList:{
        textDecoration: 'none',
        color:          'darkblue',
        paddingLeft:    '3px'
    },
    heading:{
        margin:         '20px 0',
    },
    backBtn:{
        
    }
  }));

function GitRepos(){
    const classes = useStyles();
    return(
        <Container>
            <Link className={classes.backBtn} to="/"><ArrowBackIcon></ArrowBackIcon></Link>
             <h2 className={classes.heading}>Here are the Open Source projects we are funding via Upwork</h2>
             <List className={classes.listContainer}>              
                <ListItem><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/Open-Source/blob/master/upwork/project-k8-glasswall-rebuild">K8 Glasswall Rebuild</a></ListItem>
                <ListItem><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-traffic-generator">k8-traffic-generator</a></ListItem>
                <ListItem><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-data-visualization">k8-data-visualization</a></ListItem>
                <ListItem><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-glasswall-rebuild">k8-glasswall-rebuild</a></ListItem>
                <ListItem><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-reverse-proxy">k8-reverse-proxy</a></ListItem>
                <ListItem><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-performance-use-cases">k8-performance-use-cases</a></ListItem>
                <ListItem><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href="https://github.com/filetrust/k8-test-data">k8-test-data</a></ListItem>
                <ListItem><ArrowRightIcon></ArrowRightIcon><a  className={classes.urlList} href=" https://github.com/filetrust/rebuild-k8s-filetypedetection">rebuild-k8s-filetypedetection</a></ListItem>
            </List>
        </Container>
    )
}

export default GitRepos;