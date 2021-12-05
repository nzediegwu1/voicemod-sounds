import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { SoundsPage, SoundDetails } from './pages';

/**
 * @description Landing page of VoiceMod app
 *
 * @returns {React.Component} React Component
 */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sounds/:id" component={SoundDetails} />
        <Route path="/" component={SoundsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
