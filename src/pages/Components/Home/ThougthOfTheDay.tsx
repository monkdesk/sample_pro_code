import React, { Component } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter} from '@ionic/react';
import axios from 'axios';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
    Daylist:any;
}
      
class ThougthOfTheDay extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
            Daylist:''
        };
     
      }
      async componentDidMount(){
        let init:any = {
          method: 'GET',
          headers: { 'content-type': 'multipart/form-data',
                      'Accept': 'application/json'},
          mode: 'cors',
          cache: 'default',
          dataType: 'json',
          async:    true,
        };
    
           axios.get("https://login.cyruns.com/api/api.php?action=thoughtofday",init)
          .then(response => {
            if(response.data.msgcode == '0'){
                this.setState({Daylist:response.data.daylist});
            }
          })
          .catch(error => {
            console.log("Errors"+error);
            });
        }
    
    render(){
        const {Daylist}=this.state;
        //console.log(Daylist);
        return(
        <IonPage >
        <div className='screen_main'>
        <IonHeader className='thoughtday_head'>
          <IonToolbar className='page_header'>
            <IonBackButton defaultHref='/home'></IonBackButton>
            <IonTitle>Thougth Of The Day</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <div  className='thoughtday_head' >
        <IonBackButton defaultHref='/home'></IonBackButton>
            <div className='thoughtday_text'>
                <IonText>thought of the day</IonText>
            </div>
        </div> */}
        <IonContent className='thogh_content'>
            <div className='page_contain'>
            {Daylist!=null && Daylist!=''?
                <div className='though_main'>
                   { Daylist.map((daylist:any,i:any)=>{
                      return  <div key={i} className='thought_box'>
                                <div className='thought_date'>
                                    <div className="date_blox">
                                        <p>{daylist.date}</p>
                                    </div>
                                </div>
                                <div className='thought_text'>
                                    <p>{daylist.thought}</p>
                                </div>
                                <div className="clr"></div>
                                
                          </div>
                    })}
                    </div>
                    :
                    <div className='log_loader' >
                    <div className="spinner-border log_loader_sub" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    </div>}
                   
             
                
               
                <div className='clr'> </div>
            </div>

           
           
        </IonContent>
        <div className='clr'></div>
        </div>
        </IonPage>
        )
    }
}
export default ThougthOfTheDay;