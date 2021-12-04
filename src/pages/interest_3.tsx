import { IonContent, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonSelectOption, IonSelect, IonList, IonItemDivider, IonButton} from '@ionic/react';
import '../theme/Dashboard.css';
import { useState } from 'react'

const options = {
    cssClass: 'my-custom-interface'
};

const Interest3: React.FC = () => {
  const [adventure, setAdventure] = useState<string[]>([]);
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle class="small_banner">Wayfarer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="splash_screen">
        <IonList>
          <IonText class="interest_label">
            <h1>Do you prefer group activities or solo adventures?</h1>
          </IonText>
          <IonItem>
            <IonLabel>This is a tough one..</IonLabel>
            <IonSelect value={adventure} okText="Done" cancelText="Cancel" onIonChange={e => setAdventure(e.detail.value)}>
              <IonSelectOption value="Group">Group Activities</IonSelectOption>
              <IonSelectOption value="Solo">Solo Adventure</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <IonButton routerLink="/Dashboard" class="splash_button">Next</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Interest3;
