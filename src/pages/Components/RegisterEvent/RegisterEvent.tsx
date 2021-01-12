import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter} from '@ionic/react';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
   
}
      
class RegisterEvent extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
          
        };
     
      }
    
    render(){
        return(
        <IonPage className='screen_main'>
        <IonHeader>
          <IonToolbar>
            <IonTitle>RegisterEvent</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        </IonContent>
        </IonPage>
        )
    }
}
export default RegisterEvent;