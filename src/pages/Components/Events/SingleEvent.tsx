import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter,IonLoading, IonIcon} from '@ionic/react';
import { calendar} from 'ionicons/icons';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
   
}
      
class SingleEvent extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
          
        };
     
      }
    
    render(){
        const EventDetail:any  =  localStorage.getItem("Event");
        const Event = JSON.parse(EventDetail);
        //console.log(Event);
        return(
        <IonPage >
        <div className='screen_main'>
        <IonHeader>
        <IonToolbar className='page_header'>
            <IonBackButton defaultHref='/home'></IonBackButton>
            <IonTitle className='trainviw_titl'><p>{Event.name}</p></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>    
            <div className='sel_ev_head'>
                {/* <IonItem lines='none' className='sel_eve_name'>
                    <IonText>{Event.name}</IonText>
                </IonItem> */}
                <IonItem lines='none' className='sel_eve_img'>
                    <img src={Event.image}/>
                </IonItem>
                <IonItem lines='none' className='sel_eve_date'>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonText>{Event.date}</IonText> 
                </IonItem>
            </div>
            <div className='sin_ev_content'>
                <IonItem lines='none' className='eve_box_wrap'>
                    <div className='ev_box_imgL'>
                        <img src='/assets/icon/register.png' />
                    </div>
                    <div className='ev_box_name'>
                        <p>Register</p>
                    </div>
                    {/* <div className='ev_box_imgR'>
                     <img src='/assets/icon/register2.png' />
                    </div> */}
                </IonItem>

                <IonItem lines='none' className='eve_box_wrap'>
                    <div className='ev_box_imgL'>
                        <img src='/assets/icon/submitdata.png' />
                    </div>
                    <div className='ev_box_name'>
                        <p>Submit Data</p>
                    </div>
                    {/* <div className='ev_box_imgR'>
                     <img src='/assets/icon/leadershipboard.png' />
                    </div> */}
                </IonItem>

                <IonItem lines='none' className='eve_box_wrap'>
                     <div className='ev_box_imgL'>
                        <img src='/assets/icon/download.png' />
                    </div>
                    <div className='ev_box_name'>
                        <p>Download Certificate</p>
                    </div>
                    {/* <div className='ev_box_imgR'>
                     <img src='/assets/icon/leadershipboard.png' />
                    </div> */}
                </IonItem>
                <IonItem lines='none' className='eve_box_wrap'>
                    <div className='ev_box_imgL'>
                        <img src='/assets/icon/leadershipboard.png' />
                    </div>
                    <div className='ev_box_name'>
                        <p>Leadership Board</p>
                    </div>
                    {/* <div className='ev_box_imgR'>
                     <img src='/assets/icon/leadershipboard.png' />
                    </div> */}
                </IonItem>
            </div>
        </IonContent>
        <div className='clr'></div>
        </div>
        </IonPage>
        )
    }
}
export default SingleEvent;