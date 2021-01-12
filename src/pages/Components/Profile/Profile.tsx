import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonFooter,IonLoading, IonSelectOption, IonSelect,IonIcon} from '@ionic/react';
import axios from 'axios';

import $ from "jquery";
import { personCircle } from 'ionicons/icons';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
    userdetails:any
    country:any
    blood_group:any
    t_shirt:any
    Msgcode:any
    Msg:any
    sel_Gender:any
    sel_Country:any
    sel_BloodGroup:any
    sel_Tshirt:any
    f_name:any
    l_name:any
    mobile:any
    city:any
    state:any
    email:any
    address:any
    pincode:any
    loader:any
}
class Profile extends React.Component<AppProps, AppState>{

    constructor(props:any) {
        super(props);
        this.state = {
          userdetails:[],
          country:[],
          blood_group:[],
          t_shirt:[],
          Msgcode:'',
          Msg:'',
          sel_Gender:'',
          sel_Country:'',
          sel_BloodGroup:'',
          sel_Tshirt:'',
          f_name:'',
          l_name:'',
          mobile:'',
          city:'',
          state:'',
          email:'',
          address:'',
          pincode:'',
          loader:''
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
         
           axios.post("https://login.cyruns.com/api/api.php?action=userdetails", formData,init)
          .then(response => {
            //console.log(response);
            if(response.data.msgcode == '0'){
                this.setState({userdetails:response.data.user_detail});
            }
          })
          .catch(error => {
            this.setState({Msgcode:'2'});
            console.log("Errors"+error);
            });
      
        axios.post("https://login.cyruns.com/api/api.php?action=rdetails")
        .then(response => {
          this.setState({country:response.data.country,
              blood_group:response.data.blood_group,
              t_shirt:response.data.t_shirt
          })
        })
        .catch(error => {
          this.setState({Msgcode:'2'});
          console.log("Errors"+error);
          })
      }

  async EditProfile(){
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
  
     var user_id:any = localStorage.getItem('userId');

     let {userdetails,f_name,l_name,email,mobile,state,address,city,pincode,sel_Gender,sel_Country,sel_BloodGroup,sel_Tshirt} = this.state;
        let formData = new FormData();
        
         if(f_name ==''){
          f_name = userdetails.user_firstname;
         }
         if(l_name == ''){
          l_name = userdetails.user_lastname;
         }
         if(email == ''){
          email = userdetails.user_email;
         }
         if(mobile == ''){
          mobile = userdetails.user_mobile;
         }
         if(state == ''){
          state = userdetails.state;
         }
         if(address == ''){
          address = userdetails.address;
         }
         if(city == ''){
          city = userdetails.city;
         }
         if(pincode == ''){
          pincode = userdetails.pincode;
         }
         if(sel_Gender == ''){
          sel_Gender = userdetails.gender;
         }
         if(sel_Country == ''){
          sel_Country = userdetails.country;
         }
         if(sel_BloodGroup == ''){
          sel_BloodGroup = userdetails.blood_group;
         }
         if(sel_Tshirt == ''){
          sel_Tshirt = userdetails.tshirt_size;
         }
         
        formData.append('user_id',user_id);
        formData.append('firstname',f_name);
        formData.append('lastname',l_name);
        formData.append('email',email);
        formData.append('mobile',mobile);
        formData.append('city',city);
        formData.append('gender',sel_Gender);
        formData.append('state',state);
        formData.append('country',sel_Country);
        formData.append('pincode',pincode);
        formData.append('bloodgroup',sel_BloodGroup);
        formData.append('tshirt',sel_Tshirt);
        formData.append('address',address);
        
         axios.post("https://login.cyruns.com/api/api.php?action=editprofile", formData,init)
        .then(response => {
              this.setState({Msgcode:response.data.msgcode,Msg:response.data.msg});
        })
        .catch(error => {
          this.setState({Msgcode:'2'});
          console.log("Errors"+error);
          });
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
    const {userdetails,country,blood_group,t_shirt,sel_Gender,sel_Country,
    sel_BloodGroup,sel_Tshirt,Msgcode,Msg,loader} = this.state;
   //console.log(userdetails);
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

    return(
    <IonPage >
    <div className='screen_main'>
    <IonHeader>
      <IonToolbar className='page_header'>
        <IonBackButton defaultHref='/home'></IonBackButton>
        <IonTitle>My Profile</IonTitle>
        <IonButton className='profile_save_btn' onClick={this.EditProfile.bind(this)}>
        Save</IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    <div className='page_contain'>
    {userdetails != null && userdetails !=''?
    <div className='profile_content'>
    <div className='profile_header'>
        <IonIcon icon={personCircle}></IonIcon>
        <div>
          <IonText>{userdetails.user_firstname +' '+userdetails.user_lastname}</IonText>
        </div>
    </div>
    <IonItem className='login_input'>
        <IonInput value={userdetails.user_firstname} name='f_name' onInput={(e: any) => this.InputChange(e)}></IonInput>
    </IonItem>
    <IonItem className='login_input'>
        <IonInput value={userdetails.user_lastname} name='l_name' onInput={(e: any) => this.InputChange(e)}></IonInput>
    </IonItem>
    <IonItem className='login_input'>
        <IonInput value={userdetails.user_email} name='email' onInput={(e: any) => this.InputChange(e)}></IonInput>
    </IonItem>
    <IonItem className='login_input'>
        <IonInput value={userdetails.user_mobile} name="mobile" onInput={(e: any) => this.InputChange(e)}></IonInput>
    </IonItem >
    <IonItem className='login_input'>
    <IonLabel>Gender</IonLabel>
        <IonSelect  onIonChange={(e) => this.GenderChange(e)}>
            <IonSelectOption value='1' selected={sel_Gender == '' && userdetails.gender == 1?true:sel_Gender == '1'?true:false}>Male</IonSelectOption>
            <IonSelectOption value='2' selected={sel_Gender == '' && userdetails.gender == 2?true:sel_Gender == '2'?true:false}>Female</IonSelectOption>
            <IonSelectOption value='3' selected={sel_Gender == '' && userdetails.gender == 3?true:sel_Gender == '3'?true:false}>Other</IonSelectOption>
        </IonSelect>
    </IonItem>
    <IonItem className='login_input'>
        <IonInput value={userdetails.address} name='address' type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
    </IonItem>
    <IonItem className='login_input'>
        <IonInput value={userdetails.city} name='city' type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
    </IonItem>
    <IonItem className='login_input'>
        <IonInput value={userdetails.state} name='state' type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
    </IonItem>

    <IonItem className='login_input'>
    <IonLabel>Country</IonLabel>
    <IonSelect  onIonChange={(e) => this.CountryChange(e)}>
      {country.map((cntry:any,i:any)=>{  
      return <IonSelectOption key={i} selected={sel_Country=='' && cntry==userdetails.country?true:sel_Country==cntry?true:false}>{cntry}</IonSelectOption>
    })} 
    </IonSelect>
    </IonItem>

    <IonItem className='login_input'>
        <IonInput value={userdetails.pincode} name='pincode' type='text' onInput={(e: any) => this.InputChange(e)}></IonInput>
    </IonItem>
    <IonItem className='login_input'>
    <IonLabel>Blood Group</IonLabel>
    <IonSelect  onIonChange={(e) => this.BloodGroupChange(e)}>
      {blood_group.map((bg:any,i:any)=>{  
        return <IonSelectOption key={i} selected={sel_BloodGroup == '' && bg ==userdetails.blood_group?true:sel_BloodGroup == bg?true:false }>{bg}</IonSelectOption>
      })} 
      </IonSelect>
    </IonItem>

    <IonItem className='login_input'>
    <IonLabel>T-Shirt</IonLabel>
      <IonSelect  onIonChange={(e) => this.TshirtChange(e)}>
        {t_shirt.map((tshirt:any,i:any)=>{  
          return <IonSelectOption key={i} selected={sel_Tshirt == '' && tshirt == userdetails.tshirt_size?true:sel_Tshirt == tshirt?true:false}>{tshirt}</IonSelectOption>
        })} 
      </IonSelect>
    </IonItem>
    
    {loader == '0'?
       <div className='log_loader' id='loader'>
       <div className="spinner-border log_loader_sub" role="status">
           <span className="sr-only">Loading...</span>
       </div>
       </div>
    :null}
     
    
    </div>:
      <div className='log_loader' >
      <div className="spinner-border log_loader_sub" role="status">
          <span className="sr-only">Loading...</span>
      </div>
      </div>
    }
    <div className='clr'></div>
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
        :Msgcode == '2' && Msgcode!=null?
        <div className="alert_msg"  id="success-cart">
        <p>Something Is Wrong..!</p>
        </div>
        :null}
    </IonFooter>
    <div className='clr'></div>
    </div>
        </IonPage>
        )
    }
}
export default Profile;