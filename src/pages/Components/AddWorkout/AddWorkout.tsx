import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, 
    IonToolbar, IonBackButton,IonInput, IonButton,IonFooter,IonSelect,IonDatetime,
IonSelectOption,IonToggle} from '@ionic/react';

import $ from "jquery";
import { ImagePicker,ImagePickerOptions  } from '@ionic-native/image-picker/index';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
    isShow:any
    selDate:any
    selTime:any
    WorkType:any
    km:any
    Link:any
    photo:any

   
}
      
class AddWorkout extends React.Component<AppProps, AppState>{
    constructor(props:any,private imagePicker=ImagePicker) {
        super(props);
        this.state = {
          isShow:false,
          selDate:'',
          selTime:'',
          WorkType:'',
          km:'',
          Link:'',
          photo:''
        };
     
      }
InputChange(e:any){
    
}
Toggle(e:any){
    this.setState({isShow:!this.state.isShow});
    var id = document.getElementById('toggle_btn');
        $('#id').click(function() {
          $('.hide_form').slideToggle("slow");
        });
      
}
async SubmitData(e:any){
   
}
async ImgPick(e:any){
    e.preventDefault();
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
        });
        var imageUrl = image.webPath;
        console.log(imageUrl);
        // Can be set to the src of an image now
        this.setState({
        photo: imageUrl
        })
    //  let options:ImagePickerOptions ={
    //     quality: 100,  
    //     width: 600,  
    //     height: 600, 
    //     }
    //     ImagePicker.getPictures(options).then((results) => {
    //     for (var i = 0; i < results.length; i++) {
    //         console.log('Image URI: ' + results[i]);
    //     }
    //   }, (error) => {
    //     console.log('Error occurred  while loading', error);     
    //    });
}
    DatePick(e:any){
        //console.log(e.target.value);
    }
    pickTime(e:any){
       // console.log(e.target.value);
    }
    WotkoutType(e:any){
       // console.log(e.target.value);
    }
    render(){
        const {isShow,photo} = this.state;
        const WotkType = localStorage.getItem('WotkType');

        // $(document).ready(function() {
        //     $('#toggle_btn').click(function() {
        //       $('.hide_form').slideToggle("slow");
        //     });
        //   });
        return(
        <IonPage >
            <div className='screen_main'>
        <IonHeader>
          <IonToolbar className='page_header'>
            <IonBackButton defaultHref='/home'></IonBackButton>
            <IonTitle>Add Workout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <div className='page_contain'>
            <form>
            <div className='addWork_form1'>
            <IonItem className='login_input'>
                <IonLabel>Date<IonText color="danger">*</IonText></IonLabel>
                <IonDatetime displayFormat="DD MMM YY" value='DD MMM YY' placeholder="Select Date" onIonChange={(e)=>this.DatePick(e)}></IonDatetime>
            </IonItem>
            <IonItem className='login_input'>
                <IonLabel>Time<IonText color="danger">*</IonText></IonLabel>
                <IonDatetime display-format="h:mm A" picker-format="h:mm:ss A" placeholder="Select Time"
                value='h:mm A' onIonChange={(e)=>this.pickTime(e)}></IonDatetime>
            </IonItem>
            <IonItem className='login_input'>
                <IonLabel>Type</IonLabel>
                <IonSelect placeholder="Select One" onIonChange={(e)=>this.WotkoutType(e)}>
                    <IonSelectOption value="cycling" selected={WotkType == 'cycling'?true:false}>Cycling</IonSelectOption>
                    <IonSelectOption value="running" selected={WotkType == 'running'?true:false}>Running</IonSelectOption>
                    <IonSelectOption value="swiming" selected={WotkType == 'swiming'?true:false}>Swiming</IonSelectOption>
                    <IonSelectOption value="walking" selected={WotkType == 'walking'?true:false}>Walking</IonSelectOption>
                </IonSelect>
            </IonItem>

            <IonItem className='login_input'>
                <IonLabel position="floating">Km<IonText color="danger">*</IonText></IonLabel>
                <IonInput type='text' name='km' onInput={(e: any) => this.InputChange(e)}></IonInput>
            </IonItem>
            <IonItem className='login_input'>
                <IonLabel position="floating">Link:(for more than 10km)</IonLabel>
                <IonInput type='url' name='link' onInput={(e: any) => this.InputChange(e)}></IonInput>
            </IonItem>
            <IonItem className='login_input adwork_photo' lines='none' >
                <IonLabel  >photo</IonLabel>
                <IonButton onClick={this.ImgPick.bind(this)}>PickImage</IonButton>
            </IonItem>
           </div>
           <div className='addWork_form1'>
             <IonItem lines='none' className='login_input'>
                <IonLabel>Is Timed Event?</IonLabel>
                <IonToggle id="toggle_btn" onIonChange={(e) => this.Toggle(e)} />
             </IonItem>
            {isShow == true?
             <div className='hide_form'>

            <IonItem className='login_input'>
            <IonLabel>Cyruns Event</IonLabel>
            <IonSelect placeholder="Select One">
                <IonSelectOption value="DARE URSELF Challenge 1" selected>DARE URSELF Challenge 1</IonSelectOption>
                <IonSelectOption value="Resolution 2019">Resolution 2019</IonSelectOption>
                <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
            </IonItem>

             <IonItem className='login_input'>
                 <IonLabel position="floating">BIB No.<IonText color="danger">*</IonText></IonLabel>
                 <IonInput type='text' name="bibno" onInput={(e: any) => this.InputChange(e)}></IonInput>
             </IonItem>
             <IonItem className='login_input'>
                 <IonLabel position="floating">Comments</IonLabel>
                 <IonInput type='text' name='comments' onInput={(e: any) => this.InputChange(e)}></IonInput>
             </IonItem>
            
         </div>:
         null
            }
              </div>         
            </form>
          
            <IonButton expand="block" className='login_btn sign_btn' onClick={this.SubmitData.bind(this)}>Save</IonButton>
            <div className='clr'></div>
          </div>
        </IonContent>
        </div>
        </IonPage>
        )
    }
}
export default AddWorkout;