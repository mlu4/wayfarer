import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonText, IonRouterOutlet, IonGrid, IonRow, IonCol, IonSlides, IonSlide, IonCard} from '@ionic/react';
import { calendar, home, starOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import BucketList from './bucketlist';
import Itinerary from './Itinerary';
import '../theme/Itinerary.css';
import { useState } from 'react'

const Recommendations: React.FC = () => {
  const [text, setText] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle class="small_banner">Wayfarer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader class="ion-no-border">
          <img src="/assets/images/pittsburgh_heading.jpg" alt="Pittsburgh Skyline"></img>
      </IonHeader>
      <IonContent class="body">
        <IonText class="itinerary_header">
          <h1>TRIP TO PITTSBURGH</h1>
        </IonText>
        <IonToolbar>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/Itinerary" component={Itinerary} exact={true} />
              <Route path="/" render={() => <Redirect to="/Recommendations" />} exact={true} />
            </IonRouterOutlet>
            {/*-- Tab bar --*/}
            <IonTabBar slot="top" class="top_nav">
              <IonTabButton tab="Itinerary" href="/itinerary">
                <IonLabel>Itinerary</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Recommendations" href="/Recommendations">
                <IonLabel class="active">Recommendations</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText class="section_heading">
                      <h2>Popular Destinations</h2>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonSlides class="scroll_content">
                  <IonSlide>
                    <IonCard>
                      <img src="/assets/images/phipps.jpg" alt="Phipps Botanical Garden"></img>
                      <figcaption>Phipps Conservatory</figcaption>
                    </IonCard>
                    <IonCard>
                      <img src="/assets/images/pittsburgh_skyline.jpeg" alt="Mt. Washington View"></img>
                      <figcaption>Mt. Washington Overlook</figcaption>
                    </IonCard>
                    <IonCard>
                      <img src="/assets/images/andywarhol.jpeg" alt="Andy Warhol Museum"></img>
                      <figcaption>Andy Warhol Museum</figcaption>
                    </IonCard>
                  </IonSlide>
                </IonSlides>
              </IonRow>
            </IonGrid>
          </IonRow>
          <IonRow>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText class="section_heading">
                      <h2>Recommended Eats</h2>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonSlides class="scroll_content">
                  <IonSlide>
                    <IonCard>
                      <img src="/assets/images/umami.jpeg" alt="Umami"></img>
                      <figcaption>Umami (Japanese)</figcaption>
                    </IonCard>
                    <IonCard>
                      <img src="/assets/images/noodlehead.jpeg" alt="Noodlehead"></img>
                      <figcaption>Noodlehead (Korean)</figcaption>
                    </IonCard>
                    <IonCard>
                      <img src="/assets/images/dianoias.jpeg" alt="DiAnoia's Eatery"></img>
                      <figcaption>DiAnoia's Eatery (Italian)</figcaption>
                    </IonCard>
                  </IonSlide>
                </IonSlides>
              </IonRow>
            </IonGrid>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToolbar>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/dashboard" component={Dashboard} exact={true} />
            <Route path="/bucketlist" component={BucketList} />
            <Route path="/" render={() => <Redirect to="/calendar" />} exact={true} />
          </IonRouterOutlet>
          {/*-- Tab bar --*/}
          <IonTabBar slot="bottom" class="nav_bar">
            <IonTabButton tab="home" href="/dashboard">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="calendar" href="/calendar">
              <IonIcon icon={calendar} />
              <IonLabel>Schedule</IonLabel>
            </IonTabButton>

            <IonTabButton tab="bucketlist" href="/bucketlist">
              <IonIcon icon={starOutline} />
              <IonLabel>Bucket List</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonToolbar>
    </IonPage>
  );
};

export default Recommendations;