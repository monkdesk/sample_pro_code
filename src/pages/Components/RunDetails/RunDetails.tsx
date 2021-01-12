import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter,IonLoading} from '@ionic/react';
import axios from 'axios';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
   
}
      
class RunDetails extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
          
        };
     
      }
      componentDidMount(){
        let init:any = {
          method: 'POST',
          headers: { 'content-type': 'multipart/form-data',
                      'Accept': 'application/json'},
          mode: 'cors',
          cache: 'default',
          dataType: 'json',
          async:    true,
        };
    
       var user_id:any = localStorage.getItem('userId');
          let formData = new FormData();
      
          formData.append('user_id',user_id);
         
           axios.post("https://login.cyruns.com/api/api.php?action=thoughtofday", formData,init)
          .then(response => {
            //console.log(response.data.daylist);
            if(response.data.msgcode == '0'){
               
            }
          })
          .catch(error => {
            console.log("Errors"+error);
            });
      }
    
    render(){
        return(
        <IonPage className='screen_main'>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Run Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        </IonContent>
        </IonPage>
        )
    }
}
export default RunDetails;