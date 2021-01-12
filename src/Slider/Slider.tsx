import React from 'react';
import { IonContent,IonSlides,IonSlide, IonHeader, IonItem, IonLabel, IonList, IonPage,
   IonTitle, IonToolbar,IonFooter,IonIcon,IonCard,IonCardHeader,IonCardSubtitle,IonCardTitle,
   IonCardContent,IonButton
   } from '@ionic/react';
import { arrowForward,personAdd} from 'ionicons/icons';
import $ from "jquery";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './slider.css';

interface AppProps {
   
  history:any;
}

interface AppState {
 
 

}
class Slider extends React.Component<AppProps, AppState>{

  constructor(props:any) {
    super(props);

    this.state = {
      
    }
 
  }
  render(){

    $(document).ready(function() {
        $('#down-slide').fadeIn('slow');
      
    });

    const slideOpts = {
      speed: 500
    };
    return (
      <IonPage>
        <IonContent>
        
          <div className='slider_main'>
          <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true} 
          showArrows={false} showIndicators={false}	showStatus={false}>
            <div>
                <img src="/assets/images/slider/slider1.png " />
            </div>
            <div>
                <img src="/assets/images/slider/slider2.png "/>
            </div>
            <div>
                <img src="/assets/images/slider/slider3.png " />
            </div>
        </Carousel>
        </div>
       </IonContent>
       <IonFooter className='slider_footer' id="down-slide">
         <div className='slider_text'>
         <p>Join the Growing Tribe Of Challengers</p>
        </div>
         <IonCard className='slider_footer_cont'>
           
            <IonCardHeader className='sli_foo_img'>
               <img src='assets/icon/logo.png' />
            </IonCardHeader>
            <IonCardContent>
              <div className='sign_wra_foo'>
               <IonButton expand="block" className='login_btn' routerLink="/signup">
                 Sign Up
               </IonButton>
              </div>
              <div className='log_wra_foo'>
               <IonButton expand="block" className='login_btn' routerLink="/login">
                Log In
               </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        
       </IonFooter>
      </IonPage>
    );
  }
 
};

export default Slider;
{/* <IonFooter className='slider_footer' id="down-slide">
<IonToolbar>
  <IonItem routerLink="/login" className="log_in">
    <IonTitle>LOG IN</IonTitle>
  </IonItem>
  <IonItem routerLink='/signup' className="regi_wrap" >
  <IonTitle >SIGN UP<IonIcon icon={arrowForward}></IonIcon></IonTitle>
  </IonItem>
  
</IonToolbar> */}