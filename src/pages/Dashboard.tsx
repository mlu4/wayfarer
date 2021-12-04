import { IonContent, IonSlides, IonSlide, IonCard, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonItem, IonRouterOutlet } from '@ionic/react';
import { calendar, home, starOutline, addCircleOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Calendar from './calendar';
import BucketList from './bucketlist';
import '../theme/Dashboard.css';
import CalendarWidget from "react-widgets/Calendar";
import "react-widgets/styles.css";
import { Link } from 'react-router-dom'

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle class="small_banner">Wayfarer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="splash_screen">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem lines="none" class="travel_tip">
                <IonGrid>
                  <IonRow>
                    <IonText class="tip_heading">
                      &#128161;<h1>Travel Tip of the Day</h1>
                    </IonText>
                  </IonRow>
                  <IonRow>
                    <p>Book flights 2-3 months in advance to get the best deal!</p>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText class="section_heading">
                    <h2>Month Overview</h2>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <CalendarWidget />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonRow>
          <IonRow>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText class="section_heading">
                    <h2>Upcoming Trips</h2>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="plan_new">
                  <Link to="/calendar"><IonIcon class="add_icon" icon={addCircleOutline} /></Link>
                  <IonLabel><Link to="/calendar" style={{ textDecoration: 'none', color: '#49274A' }}>Plan your next trip</Link></IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonRow>
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
                        <img src="/assets/images/greece_1.JPG" alt="Mykonos, Greece"></img>
                        <figcaption>Mykonos, Greece</figcaption>
                      </IonCard>
                      <IonCard>
                        <img src="/assets/images/amalfi.jpg" alt="Amalfi Coast, Italy"></img>
                        <figcaption>Amalfi Coast, Italy</figcaption>
                      </IonCard>
                      <IonCard>
                        <img src="/assets/images/NYC.JPG" alt="New York City Skyline"></img>
                        <figcaption>New York City, NY</figcaption>
                      </IonCard>
                      <IonCard>
                        <img src="/assets/images/barcelona.jpg" alt="Barcelona, Spain"></img>
                        <figcaption>Barcelona, Spain</figcaption>
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
                <Route path="/calendar" component={Calendar} exact={true} />
                <Route path="/bucketlist" component={BucketList} />
                <Route path="/" render={() => <Redirect to="/dashboard" />} exact={true} />
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

                <IonTabButton tab="bucketlist" href="bucketlist">
                    <IonIcon icon={starOutline} />
                    <IonLabel>Bucket List</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
      </IonToolbar>
    </IonPage>
  );
};

export default Dashboard;
