import * as React                 from 'react';
import * as ReactDOM              from 'react-dom';
import      Mainview              from './views/MainView'
import      GitBrowser            from './views/GitBrowser'
import      MsgPasg               from './views/MsgPage'
import      {HashRouter, Route }  from 'react-router-dom'




const App = () => (
    <HashRouter>      
      <div>
        <Route path="/"           exact component={ Mainview    } />
        <Route path="/gitBrowser"       component={ GitBrowser  } />
        <Route path="/msgPasg"         component={ MsgPasg    } />
      </div>
    </HashRouter>
);

ReactDOM.render(<App />, app);