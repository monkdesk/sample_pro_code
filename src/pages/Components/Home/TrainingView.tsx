import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter} from '@ionic/react';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
   
}
      
class TrainingView extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
          
        };
     
      }
    
    render(){

     var Training:any =  localStorage.getItem("Training");
    var Train = JSON.parse(Training);
    //console.log(Train);
        return(
        <IonPage>
        <div className='screen_main'>
        <IonHeader>
          <IonToolbar className='page_header'>
            <IonBackButton defaultHref='/home'></IonBackButton>
             <IonTitle className='trainviw_titl'><p>{Train.title}</p></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <div className='page_contain'>
          
          {Train.desc}
        </div>
        </IonContent>
        <div className='clr'></div>
        </div>
        </IonPage>
        )
    }
}
export default TrainingView;