import { BrowserRouter , Switch, Route} from 'react-router-dom';

import Main from './pages/main/index';
import  Repository from './pages/repository/index';

export default function Routes() {
 return (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact  component={Main} />
            <Route path='/repository' component={Repository} />
        </Switch>
    </BrowserRouter>
 )
    
}