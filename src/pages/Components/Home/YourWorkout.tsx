import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter,IonLoading} from '@ionic/react';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
   
}
      
class YourWorkout extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
          
        };
     
      }
    
    render(){
        return(
        <IonPage className='screen_main'>
        <IonHeader>
          <IonToolbar className='page_header'>
            <IonBackButton defaultHref='/home'></IonBackButton>
            <IonTitle>Your Workout </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        </IonContent>
        </IonPage>
        )
    }
}
export default YourWorkout;