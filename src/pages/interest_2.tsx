import { IonContent, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonSelectOption, IonSelect, IonList, IonItemDivider, IonButton} from '@ionic/react';
import '../theme/Dashboard.css';
import { useState } from 'react'

const Interest2: React.FC = () => {
  const [activity, setActivity] = useState<string[]>([]);
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
            <h1>Do you prefer indoor or outdoor activities?</h1>
          </IonText>
          <IonItem>
            <IonLabel>Take your pick</IonLabel>
            <IonSelect value={activity} okText="Done" cancelText="Cancel" onIonChange={e => setActivity(e.detail.value)}>
              <IonSelectOption value="Outdoor">Outdoor</IonSelectOption>
              <IonSelectOption value="Indoor">Indoor</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <IonButton routerLink="/interest_3" class="splash_button">Next</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Interest2;
