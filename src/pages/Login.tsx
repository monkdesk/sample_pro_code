import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter,IonLoading} from '@ionic/react';
import axios from 'axios';
import $ from "jquery";

import './Pages.css';
//const [showLoading, setShowLoading] = useState(true);
interface AppProps { 
  history:any;
}

interface AppState {
    hidden: any
    [x: number]: any;
    email:any
    password:any
    errors:any
    Msgcode:any
    Msg:any
    loader:any
}

class Login extends React.Component<AppProps, AppState>{
  
  constructor(props:any) {
    super(props);
    this.state = {
        hidden: true,
        email:'',
        password:'',
        errors:{},
        Msgcode:'',
        Msg:'',
        loader:''

    };
    this.toggleShow = this.toggleShow.bind(this);
  }

  async Login(e:any){
  
    if(this.handleValidation()){
      this.setState({loader:'0'});
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

   
    const {email,password} = this.state;
      let formData = new FormData();
  
      formData.append('email', email);
      formData.append('password', password);

       axios.post("https://login.cyruns.com/api/api.php?action=login", formData,init)
      .then(response => {
        this.setState({Msgcode:response.data.msgcode,
        Msg:response.data.msg});
        if(response.data.msgcode == 0){
          localStorage.setItem('userId',response.data.user_id);
          this.props.history.push('/home');
          window.location.reload(false);
        }
      })
      .catch(error => {
        console.log("Errors"+error);
        this.setState({Msgcode:'3'});
        });
    }else{
      this.setState({Msgcode:'2'});
    }
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden ,
      Msgcode:'',loader:''});
  }

  handleValidation(){
    // this.setState({Msgcode:''});
    let {email,password} = this.state;
    let errors:any = {};
    let formIsValid = true;
  
   
     if(!password){
        formIsValid = false;
        errors["password"] = "*Password is required";
     }
  
    if(!email){
       formIsValid = false;
       errors["email"] = "*email is required";
    }
    
   this.setState({errors: errors});
   return formIsValid;
  }

  InputChange(e:any){
    this.setState({
        [e.target.name]:e.target.value,
        Msgcode:'',loader:''
    });
}

 
  render(){
      const {password,hidden,Msgcode,Msg,loader} = this.state;
      //const [showLoading, setShowLoading] = useState(true);


      $(document).ready(function() {
        $("#success-cart").hide();
          $("#success-cart").fadeTo(4000, 500).slideUp(300, function() {
            $("#success-cart").slideUp(300);
          });
      });
      $(document).ready(function() {
        $("#loader").hide();
          $("#loader").fadeTo(2000, 100).slideUp(100, function() {
            $("#loader").slideUp(100);
          });
      });
    return (
      <IonPage>  
        <div className='screen_main'>
        <IonContent >
          <div > 
            <IonItem lines='none' className='login_headers'>
                <IonBackButton defaultHref='/slider'></IonBackButton>
                <IonTitle>Log In</IonTitle>
            </IonItem>
            <IonItem lines='none' className='login_logo'>
                <img src='assets/icon/logo.png' />
            </IonItem>
            <div>
            <form className='login_form'>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Email<IonText color="danger">*</IonText></IonLabel>
                    <IonInput type='text' name='email' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Password<IonText color="danger">*</IonText></IonLabel>
                    <IonInput type={this.state.hidden ? "password" : "text"} name='password' onInput={(e: any) => this.InputChange(e)}></IonInput>
                    <span className='pass_show' onClick={this.toggleShow}>{hidden == true?'Show':'Hide'}</span>
                </IonItem>
                <IonItem lines='none' className='log_forgot_pass' routerLink="/forgot-pass">
                    <p>Forgot Password?</p>
                    <div className='clr'></div>
                </IonItem>
                <div className='clr'></div>
            </form>
            {loader == '0'?
              <div className='log_loader' id='loader'>
              <div className="spinner-border log_loader_sub" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              </div>
            :null}
          
            <IonButton expand="block" className='login_btn' onClick={this.Login.bind(this)}>LOG IN</IonButton>

                <IonItem className='log_link_wrap' lines='none' routerLink="/signup" >
                    <a>Sign Up</a>
                </IonItem>
            
                <div className='log_footer'>
                    <p>By logging in you agree to the Virtual Challanges</p>
                </div> 
                <div className='log_footer'>
                    <p><a> Privacy Policy </a> and <a> Terms of Use </a></p>
                </div>
               
            </div>
          </div>
        </IonContent>
        <IonFooter>
          {Msgcode == '0' && Msgcode != null ?
            <div className="alert_msg success_bg"  id="success-cart">
              <p>{Msg}</p> 
            </div>
            :Msgcode == '1' && Msgcode != null?
            <div className="alert_msg"  id="success-cart">
             <p>{Msg}</p>
            </div>
            :Msgcode == '2' && Msgcode != null?
            <div className="alert_msg" id="success-cart">
              <p>Please fillUp *required fields</p>
            </div>
            :Msgcode == '3' && Msgcode!=null?
            <div className="alert_msg "  id="success-cart">
            <p>Something Is Wrong..!</p>
            </div>
            :null}
    </IonFooter>
    </div>
      </IonPage>
    );
  }
 
};


export default Login;