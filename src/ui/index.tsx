import * as React                 from 'react';
import * as ReactDOM              from 'react-dom';
import      Mainview              from './views/MainView'
import      GitBrowser            from './views/GitBrowser'
import      FileDrop              from './views/FileDrop'
import      {HashRouter, Route }  from 'react-router-dom'

const App = () => (
    <HashRouter>
      <div>
        <Route path="/"           exact component={ Mainview    } />
        <Route path="/gitBrowser"       component={ GitBrowser  } />
        <Route path="/fileDrop"         component={ FileDrop    } />
      </div>
    </HashRouter>
);

ReactDOM.render(<App />, app);