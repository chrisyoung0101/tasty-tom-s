import React from 'react';
import { BrowserRouter, Route, Switch }  from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';
// import StoreKeeper from './StoreKeeper';

const Router = () => (
    <BrowserRouter>
    <Switch> 
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        {/*<Route path="/storekeeper" component={StoreKeeper} />*/}
        <Route component={NotFound} />
    </Switch> 
    </BrowserRouter>
);

export default Router;

