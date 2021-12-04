import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../theme/Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle class="banner">Wayfarer</IonTitle>
          <p id="banner_p">(n.) a person who travels on foot</p>
        </IonToolbar>
      </IonHeader>
      <IonContent class="splash_screen">
        <IonButton routerLink="/register" expand="block" class="splash_button">SIGN UP</IonButton>
        <IonButton routerLink="/login" expand="block" class="splash_button">LOG IN</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
