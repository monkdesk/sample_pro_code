import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter,IonSkeletonText,IonThumbnail, IonImg} from '@ionic/react';
import axios from 'axios';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
    events:any
   
}
      
class VirtualChallenges extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
          events:[]
        };
     
      }
    async componentDidMount(){
      //e.preventDefault();
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
         
           axios.post("https://login.cyruns.com/api/api.php?action=events", formData,init)
          .then(response => {
            if(response.data.msgcode == '0'){
              //console.log(response.data);
              this.setState({events:response.data.events});
            }
          })
          .catch(error => {
            console.log("Errors"+error);
            });
      }

  GoEvent(e:any){
    //console.log(e);
    localStorage.setItem("Event",JSON.stringify(e));
    this.props.history.push("/single-event");
  }
    
    render(){
      const {events} = this.state;
      //console.log(events);
      const Monthly = events['monthly-challenges'];
      const Endurance = (events['endurance-challenges']);
     // console.log(Monthly);
        return(
        <IonPage>
          <div className='screen_main'>
        <IonHeader>
          <IonToolbar className='page_header '>
            <IonBackButton defaultHref='/home'></IonBackButton>
            <IonTitle>Virtual Challenges</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent  scrollEvents={true}>
          <div className='page_contain'>
          <div className='endure_main'>
            <IonItem lines='none' className='endu_title'>
              <IonText>Endurance Challenges</IonText>
            </IonItem>

          {Endurance!=null && Endurance != ''?
          <IonItem lines='none' className='endure_challenge'>
          {Endurance.map((endchall:any,i:any)=>{
            return <IonItem lines='none'  key={i} className='endu_block' 
            onClick={()=>this.GoEvent(endchall)}>
                    <div className='endu_block_img'>
                      <IonImg src={endchall.image} />
                     </div>
                  </IonItem>
          })}
          </IonItem>
          :
        <div>
        <IonItem >
            <IonLabel>
              <div>
               <IonThumbnail></IonThumbnail>
              </div>
              <p>
                <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
              </p>
              <p>
                <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
              </p>
            </IonLabel>
          </IonItem>
      </div>}
          </div>

          <div className='monthly_main'>
            <IonItem lines='none'  className='endu_title'>
              <IonText>Monthly Challenges</IonText>
            </IonItem>
            {Monthly!='' && Monthly !=null?
            <div  className='monthly_challenge' >
              {Monthly.map((monthly:any,i:any)=>{
              return <div key={i} className='monthly_block_main' 
              onClick={()=>this.GoEvent(monthly)}>
                     <div className='monthly_block_wrap'>
                         <div className='monthy_waps'>
                         <div className="monthly_name"> 
                            <IonText><p>{monthly.month}</p></IonText>
                          </div>
                          <div className="monyhly_img">
                             <img src={monthly.image}/>
                          </div>
                         </div>
                     </div>
                  </div>
                })}
            </div>
            :
            <div>
            <IonItem >
                <IonLabel>
                  <h3>
                    <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
                  </h3>
                  <p>
                    <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
                  </p>
                  <p>
                    <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
                  </p>
                </IonLabel>
              </IonItem>
              <IonItem >
                <IonLabel>
                  <h3>
                    <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
                  </h3>
                  <p>
                    <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
                  </p>
                  <p>
                    <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
                  </p>
                </IonLabel>
              </IonItem>
          </div>

             }
            
          </div>
          <div className='clr'></div>
          </div>  
        </IonContent>
        <div className='clr'></div>
        </div>
        </IonPage>
        )
    }
}
export default VirtualChallenges;