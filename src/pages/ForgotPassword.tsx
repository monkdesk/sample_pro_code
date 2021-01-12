import React from 'react';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle,
   IonContent,IonItem ,IonLabel,IonInput,IonText,IonButton,IonFooter} from '@ionic/react';
import $ from "jquery";
import axios from 'axios';

interface AppProps { 
  history:any;
}

interface AppState {
    email:any,
    Msgcode:any
    Msg:any
}
class ForgotPassword extends React.Component<AppProps, AppState>{
  constructor(props:any) {
    super(props);
    this.state = {
        email:'',
        Msgcode:'',
        Msg:''
    };
  
  }


async ForgtotPwd(e:any){
    const email = this.state.email;
    if(email!='' && email!=null){
      e.preventDefault();
      let init:any = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data',
                    'Accept': 'application/json'},
        mode: 'cors',
        cache: 'default',
        dataType: 'json',
        async:    true,
      };
      let formData = new FormData();
  
      formData.append('email', email);
    

      axios.post("https://login.cyruns.com/api/api.php?action=forgotpassword", formData,init)
      .then(response => {
        this.setState({Msgcode:response.data.msgcode,
        Msg:response.data.msg});
       
      })
      .catch(error => {
        console.log("Errors"+error);
        this.setState({Msgcode:'3'});
        });
     
    }
    else{
      this.setState({Msgcode:'2'});
    }
    
  }
  InputChange(e:any){
    this.setState({
        email:e.target.value,
        Msgcode:''
    });
  }
  render(){
    const{ Msgcode,Msg} = this.state;
    $(document).ready(function() {
      $("#success-cart").hide();
        $("#success-cart").fadeTo(4000, 500).slideUp(300, function() {
          $("#success-cart").slideUp(300);
        });
    });
    return (
      <IonPage>
        <div className='screen_main'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/login" />
            </IonButtons>
            <IonTitle>Forgot Password</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='forp_main'>
            <IonItem lines='none' className='login_logo'>
                <img src='assets/icon/logo.png' />
            </IonItem>
            <div className='forp_content'>
              <p>Enter email address to request instruction on how to reset your password</p>
            </div>
          <div>
            <form className='forp_form'>
              <IonItem className='login_input'>
                <IonLabel position="floating">Email<IonText color="danger">*</IonText></IonLabel>
                <IonInput type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
              </IonItem>
            </form>
            <IonButton expand="block" className='login_btn forpbtn' onClick={this.ForgtotPwd.bind(this)}>Send Request</IonButton>
          </div>
         </div>
        </IonContent>

         <IonFooter>
           {Msgcode == '0' && Msgcode != null ?
            <div className="alert_msg success_bg"  id="success-cart">
              <p>{Msg}</p> 
            </div>
            :Msgcode == '1' && Msgcode != null?
            <div className="alert_msg" id="success-cart">
             <p>{Msg}</p>
            </div>
            :Msgcode == '2' && Msgcode != null?
            <div className="alert_msg"  id="success-cart">
              <p>Please Enter Email Addrerss</p>
            </div>
            :Msgcode == '3' && Msgcode!=null?
            <div className="alert_msg"  id="success-cart">
            <p>Something Is Wrong..!</p>
            </div>
            :null}
       </IonFooter>
       </div>
      </IonPage>
    );
  }
};

export default ForgotPassword;
