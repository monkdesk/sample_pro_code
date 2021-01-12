import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle,IonCardContent,
   IonToolbar,IonCard,IonCardHeader,IonCardSubtitle,IonCardTitle,IonSlides,IonSlide } from '@ionic/react';


interface AppProps {
   
  history:any;
}

interface AppState {
 
 

}
class Tab2 extends React.Component<AppProps, AppState>{

  constructor(props:any) {
    super(props);

    this.state = {
      
    }
 
  }
  render(){
    const slideOpts = {
      initialSlide: 1,
      speed: 400,
      autoHeight:true
    };
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Tab Two</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
     
        <IonSlides pager={true}  options={slideOpts}>
            <IonSlide>
              <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                <IonCardTitle>Card Title</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
              </IonCardContent>
            </IonCard>
            </IonSlide>
            <IonSlide >
            <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </IonCardContent>
        </IonCard>
              
            </IonSlide>
            <IonSlide >
            <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </IonCardContent>
        </IonCard>
            </IonSlide>
            </IonSlides>
        </IonContent>
      </IonPage>
    );
  }
 
};

export default Tab2;