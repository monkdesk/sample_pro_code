import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter} from '@ionic/react';

import axios from 'axios';
import $ from "jquery";

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
   name:any;
   email:any;
   subject:any;
   message:any;
   loader:any;
}
      
class AskQuestion extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
            name:'',
            email:'',
            subject:'',
            message:'',
            loader:''
        };
     
      }
   async SubmitForm(){
        this.setState({loader:'0'});
        const {name,email,subject,message} = this.state;
        console.log(name);
    }
    
    InputChange(e:any){
        this.setState({[e.target.name]:e.target.value,
        loader:''});
    }
    render(){
        const {loader} = this.state;
        $(document).ready(function() {
            $("#loader").hide();
              $("#loader").fadeTo(2000, 100).slideUp(100, function() {
                $("#loader").slideUp(100);
              });
          });
        return(
        <IonPage >
        <div className='screen_main'>
        <IonHeader>
          <IonToolbar className='page_header'>
            <IonBackButton defaultHref='/home'></IonBackButton>
            <IonTitle>Ask Coach a Question</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <div className='page_contain'>
        <div className='ask_main'>
            <form className='login_form'>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Name<IonText color="danger">*</IonText></IonLabel>
                    <IonInput type='text' name='name' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Email<IonText color="danger">*</IonText></IonLabel>
                    <IonInput type='text' name='email' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Subject</IonLabel>
                    <IonInput type='text' name='subject' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Message</IonLabel>
                    <IonInput type='text' name='message' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
            </form>
            {loader == '0'?
              <div className='log_loader' id='loader'>
              <div className="spinner-border log_loader_sub" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              </div>
            :null}
            <IonButton expand="block" className='login_btn ask_btn' onClick={this.SubmitForm.bind(this)}>send message</IonButton>
        </div>

        </div>
        </IonContent>
        <div className='clr'></div>
        </div>
        </IonPage>
        )
    }
}
export default AskQuestion;