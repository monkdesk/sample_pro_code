import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,IonSplitPane
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, flash, send } from 'ionicons/icons';

import Slider from './Slider/Slider';
import Login from './pages/Login';
import SignUP from './pages/SignUP';
import MainApp from './pages/Components/MainApp';
import ForgotPassword from './pages/ForgotPassword';
import Default from './pages/Components/Home/Default';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css'; 
let userId:any = localStorage.getItem("userId");
if(localStorage.getItem("userId")){
  var isLogin:any = true;
}else{
  var isLogin:any = false;
}
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* <IonTabs> */}
        <IonRouterOutlet>
         <Route path="/slider" component={Slider} exact={true}/>
          {/* <Route path="/" render={() => <Redirect to="/slider" />} exact={true} /> */}
          <Route path="/home" component={MainApp} />
        
          <Route path="/login" component={Login} exact={true}/>
          <Route path="/signup" component={SignUP}/>  
          <Route path="/forgot-pass" component={ForgotPassword}/>
         
          <Route path="/profile" component={MainApp} exact={true} />
          <Route path="/data-sync" component={MainApp} exact={true} />
          <Route path="/leadershipboard" component={MainApp} exact={true} />
          <Route path="/register-event" component={MainApp} exact={true} />
          <Route path="/run-detail" component={MainApp} exact={true} />
          <Route path="/addworkout" component={MainApp} exact={true}/> 
          <Route path="/virtual-challenges" component={MainApp} exact={true} />
          <Route path="/single-event" component={MainApp} exact={true}/>
          <Route path="/thougthoftheday" component={MainApp} exact={true}/>
          <Route path="/training" component={MainApp} exact={true}/>
          <Route path="/training-view" component={MainApp} exact={true}/>
          <Route path="/your-workout" component={MainApp} exact={true} />
          <Route path="/askquestion" component={MainApp} exact={true}/>
          <Route path="/news" component={MainApp} exact={true}/>

          {isLogin == true?
            <Route path="/" render={() => <Redirect to="/home"/> } exact={true} />:
            <Route path="/" render={() => 
            isLogin == true?(<Redirect to='/home'/>):(<Redirect to="/slider" />)
            } 
             /> 
           }

        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
