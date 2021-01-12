import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter,IonLoading,IonIcon} from '@ionic/react';
import axios from 'axios';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
    Traning:any
}
      
class Training extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
          Traning:[],
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
    
      axios.get("https://login.cyruns.com/api/api.php?action=traning",init)
      .then(response => {
        if(response.data.msgcode == '0'){
          //console.log(response);
            this.setState({Traning:response.data.traning});
        }
      })
      .catch(error => {
        console.log("Errors"+error);  
        });
      }
  TrainingView(e:any){
    localStorage.setItem("Training",JSON.stringify(e));
     this.props.history.push('/training-view') ;


  }
  AskQuestion(){
    this.props.history.push('/askquestion');
  }
    
    render(){
      const {Traning} = this.state;
      //console.log(Traning);
        return(
        <IonPage>
        <div className='screen_main'>
        <IonHeader>
          <IonToolbar className='page_header'>
            <IonBackButton defaultHref='/home'></IonBackButton>
            <IonTitle>Training</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <div className='page_contain'>
        {Traning!=''&&Traning!=null?
          <div className='train_main'>
          { Traning.map((train:any,i:any)=>{
             return <div key={i} className='train_box' onClick={()=>this.TrainingView(train)}>
                        <div className='train_ico'>
                          <img src='/assets/icon/running.png' />
                        </div>
                        <div className='train_title'>
                          <p>{train.title}</p>
                        </div>
                        <div className='train_icor'>
                            <IonIcon name="chevron-forward-outline"></IonIcon>
                        </div>
                    </div>
           })}
             <div className='tra_ask_btn'>
               <IonButton expand='block' className='login_btn' onClick={this.AskQuestion.bind(this)}>Ask Coach A Question</IonButton>
            </div>
           </div>
          
        :
        <div className='log_loader' >
        <div className="spinner-border log_loader_sub" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </div>}
        </div>
        </IonContent>
         <div className='clr'></div>
        </div>
        </IonPage>
        )
    }
}
export default Training;