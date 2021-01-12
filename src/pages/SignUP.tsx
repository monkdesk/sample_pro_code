import React from 'react';
import { IonContent, IonBackButton, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar,
    IonInput,IonText,IonButton, IonSelect, IonSelectOption,IonFooter, IonIcon,IonSearchbar } from '@ionic/react';
import axios from 'axios';
import $ from "jquery";
import { checkmark } from 'ionicons/icons';


interface AppProps {
   
  history:any;
}

interface AppState {
    [x: number]: any;
    f_name:any
    l_name:any
    email:any
    mobile:any
    password:any
    address:any
    city:any
    state:any
    pincode:any
    Msgcode:any
    Msg:any
    errors:any
    country:any
    blood_group:any
    t_shirt:any
    sel_Gender:any
    sel_BloodGroup:any
    sel_Country:any
    sel_Tshirt:any
    loader:any
}
class SignUP extends React.Component<AppProps, AppState>{

  constructor(props:any) {
    super(props);

    this.state = {
      f_name:'',
      l_name:'',
      email:'',
      mobile:'',
      password:'',
      Msgcode:'',
      Msg:'',
      address:'',
      city:'',
      state:'',
      pincode:'',
      errors:{},
      country:[],
      blood_group:[],
      t_shirt:[],
      sel_Gender:'',
      sel_BloodGroup:'',
      sel_Country:'',
      sel_Tshirt:'',
      loader:''

    }
  }

  async componentDidMount(){
    this.setState({
      Msgcode:'',loader:''
  });
      axios.post("https://login.cyruns.com/api/api.php?action=rdetails")
      .then(response => {
        this.setState({country:response.data.country,
            blood_group:response.data.blood_group,
            t_shirt:response.data.t_shirt
        })
      })
      .catch(error => {
        console.log("Errors"+error);
        })
  }

  async SignUp(e:any){
    if(this.handleValidation()){
    e.preventDefault();
    this.setState({loader:'0'});
    let init:any = {
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data',
                  'Accept': 'application/json'},
      mode: 'cors',
      cache: 'default',
      dataType: 'json',
      async:    true,
      
    };

   
    const {f_name,l_name,mobile,email,password,city,state,address,sel_Gender,
      sel_BloodGroup,sel_Country,sel_Tshirt} = this.state;
      let formData = new FormData();
  
      formData.append('firstname', f_name);
      formData.append('lastname', l_name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('password', password);
      formData.append('city', city);
      formData.append('gender', sel_Gender);
      formData.append('address', address);
      formData.append('state', state);
      formData.append('country', sel_Country);
      formData.append('pincode', password);
      formData.append('bloodgroup', sel_BloodGroup);
      formData.append('tshirt', sel_Tshirt);

       axios.post("https://login.cyruns.com/api/api.php?action=registration", formData,init)
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
        this.setState({Msgcode:'3'});
        console.log("Errors"+error);

        });
    }else{
      this.setState({Msgcode:'2'});
    }
  }

  handleValidation(){
    let {f_name,l_name,email,mobile,password,city} = this.state;
    let errors:any = {};
    let formIsValid = true;
  
    if(!f_name){
      formIsValid = false;
      errors["f_name"] = "*f_name is required";
   }
    if(!l_name){
      formIsValid = false;
      errors["l_name"] = "*l_name is required";
     }
     if(!password){
        formIsValid = false;
        errors["password"] = "*Password is required";
     }
  
    if(!email){
       formIsValid = false;
       errors["email"] = "*email is required";
    }
    if(!mobile){
      formIsValid = false;
      errors["mobile"] = "*mobile is required";
   }
   if(!city){
    formIsValid = false;
    errors["city"] = "*city is required";
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

GenderChange(e:any){
  this.setState({sel_Gender:e.target.value});
}
CountryChange(e:any){
  this.setState({sel_Country:e.target.value});
}
BloodGroupChange(e:any){
  this.setState({sel_BloodGroup:e.target.value});
}
TshirtChange(e:any){
  this.setState({sel_Tshirt:e.target.value});
}

  render(){
    let {password,country, blood_group, t_shirt,Msgcode,Msg,loader} = this.state;
    
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
      <IonPage >
       <div className='screen_main'>
        <IonContent>
            <IonItem lines='none' className='login_headers'>
                <IonBackButton defaultHref='/slider'></IonBackButton>
                <IonTitle>Sign Up</IonTitle>
            </IonItem>
            <IonItem lines='none' className='login_logo'>
                <img src='assets/icon/logo.png' />
            </IonItem>
            <div>
            <form className='login_form'>
                <IonItem  className='login_input'>
                    <IonLabel position="floating">First Name<IonText color="danger">*</IonText></IonLabel>
                    <IonInput name='f_name' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Last Name<IonText color="danger">*</IonText></IonLabel>
                    <IonInput name='l_name' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Email<IonText color="danger">*</IonText></IonLabel>
                    <IonInput name='email' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Mobile<IonText color="danger">*</IonText></IonLabel>
                    <IonInput name="mobile" onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Password<IonText color="danger">*</IonText></IonLabel>
                    <IonInput name='password' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
               
                {password.length<6 || password.length>18?
                <div className='pass_instr'>
                  <p>Password Must be 6-18 characters</p>
                </div>
                : <div className='pass_instr pass_bg'>
                    <p>Password is Good  <IonIcon icon={checkmark} className='pass_ico'></IonIcon></p>
                  </div>}
              
                <IonItem className='login_input'>
                <IonLabel>Gender</IonLabel>
                    <IonSelect>
                        <IonSelectOption value="1" >Male</IonSelectOption>
                        <IonSelectOption value="2">Female</IonSelectOption>
                        <IonSelectOption value="3">Other</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Address</IonLabel>
                    <IonInput name='address' type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">City<IonText color="danger">*</IonText></IonLabel>
                    <IonInput name='city' type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">State</IonLabel>
                    <IonInput name='state' type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
               
                <IonItem className='login_input'>
                    <IonLabel>Country</IonLabel>
                    <IonSelect  onIonChange={(e) => this.CountryChange(e)}>
                     {country.map((cntry:any,i:any)=>{  
                       console.log(country[i]);
                     return <IonSelectOption key={i} selected={country[i]=="India"?true:false}>{cntry}</IonSelectOption>
                    })} 
                    </IonSelect>
                </IonItem>
                <IonItem className='login_input'>
                    <IonLabel position="floating">Pin Code</IonLabel>
                    <IonInput name='pincode' type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
                </IonItem>
                <IonItem className='login_input'>
                <IonLabel>Blood Group</IonLabel>
                    <IonSelect  onIonChange={(e) => this.BloodGroupChange(e)}>
                    {blood_group.map((bg:any,i:any)=>{  
                     return <IonSelectOption key={i}>{bg}</IonSelectOption>
                    })} 
                    </IonSelect>
                </IonItem>
                <IonItem className='login_input'>
                <IonLabel>T-Shirt</IonLabel>
                    <IonSelect  onIonChange={(e) => this.TshirtChange(e)}>
                    {t_shirt.map((tshirt:any,i:any)=>{  
                     return <IonSelectOption key={i}>{tshirt}</IonSelectOption>
                    })} 
                    </IonSelect>
                </IonItem>
            </form>
            {loader == '0'?
              <div className='log_loader sign_loader' id='loader'>
              <div className="spinner-border log_loader_sub" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              </div>
            :null}
            <IonButton expand="block" className='login_btn sign_btn' onClick={this.SignUp.bind(this)}>
            SIGN UP
            </IonButton>
                <IonItem className='log_link_wrap' lines='none' routerLink="/login" >
                    <a>Sign In</a>
                </IonItem>
              <div className='log_footer_main'>
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
            <div className="alert_msg" id="success-cart">
             <p>{Msg}</p>
            </div>
             :Msgcode == '2' && Msgcode != null?
             <div className="alert_msg"  id="success-cart">
              <p>Plese fillup *required fields</p>
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

export default SignUP;