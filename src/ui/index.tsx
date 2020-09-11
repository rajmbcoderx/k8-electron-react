import * as React                 from 'react';
import * as ReactDOM              from 'react-dom';
import      {HashRouter, Route }  from 'react-router-dom'

import      Mainview              from './views/MainView'
import      FileDrop            from './views/FileDrop'
import      DashboardK8           from './views/DashboardK8'
import      SlackBotUi              from './views/SlackBotUi'

const App = () => (

    <HashRouter>      
      <div>
        <Route path="/"           exact component={ Mainview    } />
        <Route path="/home"           exact  component={ Mainview    } />
        <Route path="/fileDrop"       exact component={ FileDrop  } />
        <Route path="/dashboardK8"         exact component={ DashboardK8    } />
        <Route path="/slackBot"        exact component={ SlackBotUi    } />
      </div>
    </HashRouter>
);

ReactDOM.render(<App />, app);