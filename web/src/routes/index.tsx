import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Route from './routes';

import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';

//A milha extra
import Login from '../pages/SignIn';
import Register from '../pages/Register';


function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" component={Login} exact/>
            <Route path="/register" component={Register}/>

            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />

        </BrowserRouter>
    );
}

export default Routes;

