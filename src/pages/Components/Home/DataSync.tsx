import React, {  } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter,IonLoading} from '@ionic/react';

import { InAppBrowser } from '@ionic-native/in-app-browser/index';
import axios from 'axios';


interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
}
      
class DataSync extends React.Component<AppProps, AppState>{
//iab:any=InAppBrowser;  
appKey = '41838';
redirectURI = 'http://localhost:8100/home';
url = 'https://www.strava.com/oauth/authorize?client_id=' + this.appKey + '&redirect_uri=' + this.redirectURI + '&response_type=code&approval_prompt=auto&scope=read_all';  
    constructor(props:any,private iab=InAppBrowser) {
        super(props);
        this.state = {
          
        };
     
      }
    async login(e:any){
        //alert("click");
        e.preventDefault();
        this.doLogin().then((code) => {
            console.log(code);
           console.log('code');
          }) 
          .catch(error => {
            console.log("Errors"+error);
            });
    }

    doLogin() {
        //alert("dologin");
        var redirectURI = 'http://localhost:8100/home';
        var appKey = '41838';
        var iab=InAppBrowser;
        var url = 'https://www.strava.com/oauth/authorize?client_id=' + appKey + '&redirect_uri=' + redirectURI + '&response_type=code&approval_prompt=auto&scope=read_all';
        return new Promise((resolve, reject) => {
          let browser = iab.create(url, 'location=no');
          let listener = browser.on('loadstart').subscribe((event: any) => {
            // Avoid transition pages
            if((event.url.indexOf('oauth/authorize') > -1) || (event.url.indexOf('oauth/accept_application') > -1)){
              return;
            }
      
            // On unauthorize
            if(event.url.indexOf('?state=&error=access_denied') > -1){
              browser.close();
              alert("You must authorize access to Strava in order to manage your equipment.");
              return;
            }
      
            // On authorization success
            if(event.url.indexOf(this.redirectURI) > -1 ){
              let token = event.url.split('&')[1].split('=')[1];
              listener.unsubscribe();
              browser.close();
              resolve(token);
            } else {
              reject("Could not authenticate");
            }
          });
        });
      }
    render(){
        return(
        <IonPage className='screen_main'>
        <IonHeader>
          <IonToolbar className='page_header'>
            <IonBackButton defaultHref='home'></IonBackButton>
            <IonTitle>DataSync</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonItem>
            <IonButton onClick={this.login.bind(this)}>Connect With Strava</IonButton>
        </IonItem>
        </IonContent>
        </IonPage>
        )
    }
}
export default DataSync;