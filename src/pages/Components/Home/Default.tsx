import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
    IonInput, IonButton,IonImg,IonSlides,IonSlide,IonSkeletonText,IonCol } from '@ionic/react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// import { Swiper, Slide } from 'react-dynamic-swiper';
// import 'react-dynamic-swiper/lib/styles.css'
import axios from 'axios';

interface AppProps { 
    history:any;
   
}

interface AppState {
    [x: number]: any;
    userdetails:any
    events:any
}
      
class Default extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
            userdetails:[],
            events:[]
        };
     
      }

      async componentDidMount(){
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
            if(response.data.msgcode == '0'){
                this.setState({userdetails:response.data.user_detail});
            }
          })
          .catch(error => {
            console.log("Errors"+error);
            });

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
    
    slidesDidLoad(slides:any) {
    slides.startAutoplay();
    }
    HomeMenuTab(){
        alert('click');
        this.props.history.push('/your-workout');
    }
    SlideClick(e:any){
        localStorage.setItem("Event",JSON.stringify(e));
        this.props.history.push("/single-event");
    }
    render(){
    const {userdetails,events} = this.state;
    const UserName =  userdetails['user_firstname'];
    const Monthly = events['monthly-challenges'];
    const Endurance = (events['endurance-challenges']);
  
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

        const slideOpts = {
            initialSlide: 0,
            loop: true,
            autoplay:true,
            speed: 500,
            slidesPerView:2.3,
          }
        return(
        <IonPage className='home_default'>
            <div  className='screen_main'>
            <IonItem className='home_top_text' lines='none'>
                <IonText>
                    {greet},<br/> {UserName}
                </IonText>
            </IonItem>
            <IonItem className='home_top_logo' lines='none'>
                <a href='/home'><img src='assets/icon/logo.png'/></a>
            </IonItem>
        <IonContent>
        <div className='page_contain'>

            <div className="activiy_box">
         
            <IonItem lines='none' className='home_menutab_wrap' routerLink='/your-workout'>
               <div className='icon_wraps'>
                   <div className='icon_wraps_inner'>
                     <div className="activity_img">
                        <img src='assets/icon/icon1.png' />
                      </div>
                <div className='clr'></div>
                <div className="activiy_name">
                    <IonText><p>Your</p><p>Workouts</p> </IonText>
                </div>
                 </div>
             </div>
            </IonItem>
         

            <IonItem  className='home_menutab_wrap' lines='none' routerLink='/virtual-challenges'>
               <div className='icon_wraps'>
                   <div className='icon_wraps_inner'>
                        <div className="activity_img">
                         <img src='assets/icon/icon2.png' />
                        </div>
                        <div className="activiy_name">
                         <IonText> <p>Join</p> <p>virtual Challenges</p></IonText>
                        </div>
                     </div>
                </div>
            </IonItem>

            <IonItem  className='home_menutab_wrap' lines='none' routerLink='/training'>
               <div className='icon_wraps'>
                   <div className='icon_wraps_inner'>
                <div className="activity_img">
                 <img src='assets/icon/icon3.png' />
                 </div>
                 <div className="activiy_name">
                 <IonText><p>Training</p></IonText>
                 </div>
                 </div>
                </div>
            </IonItem>

            <IonItem  className='home_menutab_wrap' lines='none' routerLink='/news'>
               <div className='icon_wraps'>
                   <div className='icon_wraps_inner'>
                    <div className="activity_img">
                        <img src='assets/icon/icon4.png' />
                    </div>
                    <div className="activiy_name"> 
                        <IonText><p>News</p></IonText>
                    </div>
                   </div>
               </div>
            </IonItem>
            </div>
          
          <div>
            <IonText className='challenge_slides_label'>Challenges</IonText>
          
            <IonItem lines='none' className='challenge_slides'>
           
        { Monthly!=null && Monthly!=''?
            <IonSlides  options={slideOpts} >
          {Monthly.map((event:any,i:any)=>{
             return   <IonSlide key={i} onClick={()=>this.SlideClick(event)}>
                        <IonItem lines='none' className='challenge_slide_img'>
                        <div className="img_names">
                            <IonImg src={event.image}/>
                        </div>
                        </IonItem>
                    </IonSlide> 

                }          
               )}   
                </IonSlides> 
                 :
                <div className='log_loader' id='loader'>
              <div className="spinner-border log_loader_sub" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              </div>
                  }
            </IonItem>
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
export default Default;