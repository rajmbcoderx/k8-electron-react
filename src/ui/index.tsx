import * as React                 from 'react';
import * as ReactDOM              from 'react-dom';
import      Mainview              from './views/MainView'
import      GitBrowser            from './views/GitBrowser'
import      MsgPasg               from './views/MsgPage'
import      {HashRouter, Route }  from 'react-router-dom'
import      GitRepos              from './views/GitRepo'
import      FileDrop              from './views/FileDrop'

const App = () => (
    <HashRouter>      
      <div>
        <Route path="/"           exact component={ Mainview    } />
        <Route path="/home"             component={ Mainview    } />
        <Route path="/home1"            component={ Mainview    } />
        <Route path="/home2"            component={ Mainview    } />
        <Route path="/gitBrowser"       component={ GitBrowser  } />
        <Route path="/msgPasg"          component={ MsgPasg    } />
        <Route path="/gitRepos"         component={ GitRepos    } />
        <Route path="/fileDrop"         component={ FileDrop    } />
      </div>
    </HashRouter>
);

ReactDOM.render(<App />, app);