import { IonContent, IonButton, IonItem, IonLabel,IonProgressBar,
  IonLoading, IonItemOption, IonIcon, IonNote, IonPage } from '@ionic/react';
//import { book, build, colorFill, grid } from 'ionicons/icons';
import React, { useState } from 'react';
//import './Tab1.css';

const Tab1: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);
  // setTimeout(() => {
  //   setShowLoading(false);
  // }, 2000);

  return (
    <IonPage>
     <IonContent>
      <IonButton onClick={() => setShowLoading(true)}>Show Loading</IonButton>
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Loading...'}
        duration={3000}
      />
    </IonContent>
  </IonPage>
  );
};

export default Tab1;
