import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,IonFab,IonFabButton,IonFabList, IonText
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  home, walk,bicycle,person,add,clipboard,podium,newspaper } from 'ionicons/icons';
//import Tab1 from '../../Tab1';
//import Tab2 from '../../Tab2';
//import Tab3 from '../../Tab3';
import Default from './Home/Default';
import Profile from './Profile/Profile';
import RunDetails from './RunDetails/RunDetails';
import LeadershipBoard from './LeadershipBoard/LeadershipBoard';
import RegisterEvent from './RegisterEvent/RegisterEvent';
import YourWorkout from './Home/YourWorkout';
import VirtualChallenges from './Home/VirtualChallenges';
import Training from './Home/Training';
import DataSync from './Home/DataSync';
import News from './Home/News';
import AddWorkout from './AddWorkout/AddWorkout';
import SingleEvent from './Events/SingleEvent';
import ThougthOfTheDay from './Home/ThougthOfTheDay';
import TrainingView from './Home/TrainingView';
import AskQuestion from './Home/AskQuestion';

interface AppProps { 
  history:any;
}
class MainApp extends React.Component<AppProps>{

  AddWorkout(e:any){
    localStorage.setItem('WotkType',e);
  }

     render(){
         return(
            <IonApp>
            <IonReactRouter>
               <IonTabs> 
                <IonRouterOutlet>
                  {/* <Route path="/home" render={() => <Redirect to="/home/default" />} exact={true} /> */}
                  <Route path="/home" component={Default} exact={true}/>
                  <Route path="/profile" component={Profile} exact={true} />
                  <Route path="/leadershipboard" component={LeadershipBoard} exact={true} />
                  <Route path="/register-event" component={RegisterEvent} exact={true} />
                  <Route path="/run-detail" component={RunDetails} exact={true} />
                  <Route path="/data-sync" component={DataSync} exact={true} />
                  <Route path="/your-workout" component={YourWorkout} exact={true} />
                  <Route path="/virtual-challenges" component={VirtualChallenges} exact={true} />
                  <Route path="/training" component={Training} exact={true}/>
                  <Route path="/news" component={News} exact={true}/>
                  <Route path="/addworkout" component={AddWorkout} exact={true}/> 
                  <Route path="/single-event" component={SingleEvent} exact={true}/>
                  <Route path="/thougthoftheday" component={ThougthOfTheDay} exact={true}/>
                  <Route path="/training-view" component={TrainingView} exact={true}/>
                  <Route path="/askquestion" component={AskQuestion} exact={true}/>

                
                </IonRouterOutlet>
               
                <IonTabBar slot="bottom">

                  <IonTabButton tab="tab1" href="/home">
                  <IonIcon icon={home}></IonIcon>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/profile">
                    <IonIcon icon={person} />
                    {/* <IonLabel>Profile</IonLabel> */}
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/run-detail">
                    {/* <IonIcon icon={walk} /> */}
                    {/* <IonLabel>Run</IonLabel> */}
                  </IonTabButton>
                 
                  <IonTabButton tab="tab4" href="/leadershipboard">
                    <IonIcon icon={podium}></IonIcon>
                    {/* <IonLabel>Leadership Board</IonLabel> */}
                  </IonTabButton>
                  <IonTabButton tab="tab5" href="/virtual-challenges">
                    <IonIcon icon={newspaper} />
                    {/* <IonLabel>Register Events</IonLabel> */}
                  </IonTabButton>
                </IonTabBar> 
               </IonTabs>
               <IonFab className='tab_fab_main'>
                <IonFabButton className='tab_fab_main_wrap'>
                    <IonIcon icon={add}/>
                </IonFabButton>
                <IonFabList side="top" className='fab_list'>
                    <IonFabButton  className='tab_fab_btn'  routerLink="/addworkout" onClick={()=>this.AddWorkout('walking')}>
                      <IonIcon name="walk"/>
                      <IonText>Add Walking</IonText>
                    </IonFabButton>
                    <IonFabButton className='tab_fab_btn'  routerLink="/addworkout" onClick={()=>this.AddWorkout('swiming')}>
                      <IonIcon name="logo-facebook" />
                      <IonText>Add Swiming</IonText>
                    </IonFabButton>
                    <IonFabButton className='tab_fab_btn'  routerLink="/addworkout"  onClick={()=>this.AddWorkout('running')}>
                       <IonIcon name="walk"/>
                      <IonText>Add Running</IonText>
                      </IonFabButton>
                    <IonFabButton className='tab_fab_btn'  routerLink="/addworkout" onClick={()=>this.AddWorkout('cycling')}>
                      <IonIcon name="bicycle" />
                      <IonText>Add Cycling</IonText>
                    </IonFabButton>
                    <IonFabButton className='tab_fab_btn'  routerLink="/thougthoftheday" >
                      <IonIcon name="bicycle" />
                      <IonText>thougthoftheday</IonText>
                    </IonFabButton>
                </IonFabList>
                </IonFab>
            </IonReactRouter>
          </IonApp>
        );
    }
   
}

export default MainApp;
