import { IonContent, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonSelectOption, IonSelect, IonList, IonItemDivider, IonButton} from '@ionic/react';
import '../theme/Dashboard.css';
import { useState } from 'react'

const options = {
    cssClass: 'my-custom-interface'
};

const Interest1: React.FC = () => {
  const [text, setText] = useState<string>();
  const [cuisine, setCuisine] = useState<string[]>([]);
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle class="small_banner">Wayfarer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="splash_screen">
        <IonList lines="none">
          <IonText class="interest_label">
              <h1>What are your favorite cuisines?</h1>
          </IonText>
          <IonItem>
            <IonLabel class="interest_label">Feel free to choose more than one!</IonLabel>
            <IonSelect interfaceOptions={options} value={cuisine} multiple={true} cancelText="Cancel" okText="Done" onIonChange={e => setCuisine(e.detail.value)}>
              <IonSelectOption value="American">American</IonSelectOption>
              <IonSelectOption value="Asian">Asian</IonSelectOption>
              <IonSelectOption value="Mexican">Mexican</IonSelectOption>
              <IonSelectOption value="Italian">Italian</IonSelectOption>
              <IonSelectOption value="Indian">Indian</IonSelectOption>
              <IonSelectOption value="French">French</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItemDivider>Your Selections</IonItemDivider>
          <IonItem>{cuisine.length ? cuisine.reduce((curr, prev) => prev + ', ' + curr, '') : ''}</IonItem>
        </IonList>
        <IonButton routerLink="/interest_2" class="splash_button">Next</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Interest1;
