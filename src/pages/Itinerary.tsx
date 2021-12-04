import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonRouterOutlet,
  IonItemSliding,
  IonFab,
  IonItemOption,
  IonItemOptions,
  IonCheckbox,
  IonButton,
  IonButtons,
  IonFabButton,
  IonModal,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";import { calendar, home, starOutline, trash, add, close } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import BucketList from './bucketlist';
import Recommendations from "./Recommendations"
import '../theme/Itinerary.css';
import { useState, Component } from 'react'


interface IterProps {
  itinerary: any
}

class Itinerary extends Component {
  props: IterProps

  constructor(props: IterProps) {
   super(props)
   this.props = props
    console.log(props.itinerary as any)
    //this.state = {
     // location: 'PITTSBURGH',
    //  startDate: "2021-12-10",
    //  endDate: "2021-12-10"
   // }
  }

  state = {
    itineraryActs: [
      {
        content: "Have fun!",
        finished: false
      }
    ],
    modalOpen: false,
    newActivityContent: ""
  };

  componentDidMount() {
    // load activities from local storage
    let activities = localStorage.getItem("itineraryActs");
    if (activities !== null) {
      this.setState({
        itineraryActs: JSON.parse(activities)
      });
    }
  }

  persistActivitiesToStorage = (newActivities: any) => {
    // persist activities to local storage
    localStorage.setItem("itineraryActs", JSON.stringify(newActivities));
  };

  activityContentInputHandler = (event: any) => {
    this.setState({
      newActivityContent: event.target.value
    });
  };

  clearActivityContent = () => {
    this.setState({ newActivityContent: "" });
  };

  addItemToList = () => {
    if (this.state.newActivityContent === "") {
      return;
    }
    let newItineraryActs = [...this.state.itineraryActs];
    newItineraryActs.push({
      content: this.state.newActivityContent,
      finished: false
    });

    this.setState({
      itineraryActs: newItineraryActs,
      newActivityContent: ""
    });

    this.persistActivitiesToStorage(newItineraryActs);
  };

  switchItemCheckedStatus = (idx: number) => {
    let newItineraryActs = [...this.state.itineraryActs];
    newItineraryActs[idx].finished = !newItineraryActs[idx].finished;
    this.setState({
      itineraryActs: newItineraryActs
    });

    this.persistActivitiesToStorage(newItineraryActs);
  };

  listRef: any;

  removeItemFromList = (idx: number) => {
    let newItineraryActs = [...this.state.itineraryActs];
    newItineraryActs.splice(idx, 1);
    this.setState({
      itineraryActs: newItineraryActs
    });

    this.persistActivitiesToStorage(newItineraryActs);
  };

  toggleModalOpenStatus = () => {
    const isModalOpen = this.state.modalOpen;
    this.setState({ modalOpen: !isModalOpen });
  };

  render() {
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
            <h1>TRIP TO {this.props.itinerary.location}<br></br></h1>
            <p>{this.props.itinerary.startDate} - {this.props.itinerary.endDate}</p>
          </IonText>
          <IonToolbar>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/Recommendations" component={Recommendations} exact={true} />
                <Route path="/" render={() => <Redirect to="/itinerary" />} exact={true} />
              </IonRouterOutlet>
              {/*-- Tab bar --*/}
              <IonTabBar slot="top" class="top_nav">
                <IonTabButton tab="Itinerary" href="/itinerary">
                  <IonLabel class="active">Itinerary</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Recommendations" href="/Recommendations">
                  <IonLabel>Recommendations</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonToolbar>
          <IonList lines="none">
            <IonItem class="itinerary_item">
              <IonGrid>
                <IonRow>
                  <IonCol class="day_header">
                    <h1>Day 1</h1>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonList ref={me => (this.listRef = me)}>
                    {this.state.itineraryActs.map((itineraryItem, idx) => {
                      return (
                        <IonItemSliding key={idx}>
                          <IonItem>
                            <IonCheckbox
                              onClick={() => this.switchItemCheckedStatus(idx)}
                              slot="start"
                              value={itineraryItem.content}
                              checked={itineraryItem.finished}
                            />
                            <IonLabel>{itineraryItem.content}</IonLabel>
                          </IonItem>
                          <IonItemOptions side="end">
                            <IonItemOption
                              onClick={() => {
                                this.removeItemFromList(idx);
                                this.listRef.closeSlidingItems(); // close sliding
                              }}
                              color="danger"
                            >
                                <IonIcon icon={trash} slot="start" /> Delete
                            </IonItemOption>
                          </IonItemOptions>
                        </IonItemSliding>
                      );
                    })}
                  </IonList>
                  <IonButton class="add_button" onClick={() => this.toggleModalOpenStatus()}>
                      <IonIcon icon={add} />Add an Activity
                  </IonButton>
                  <IonModal isOpen={this.state.modalOpen}>
                    <IonHeader>
                      <IonToolbar>
                        <IonButtons>
                          <IonTitle>Add an activity</IonTitle>
                          <IonButton onClick={() => this.toggleModalOpenStatus()}>
                            <IonIcon icon={close} />
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                      <IonTextarea
                        placeholder="what's on the agenda?"
                        value={this.state.newActivityContent}
                        onIonChange={e => this.activityContentInputHandler(e)}
                        autofocus
                      />
                      <IonButton
                        onClick={() => {
                          this.addItemToList();
                          this.toggleModalOpenStatus();
                        }}
                      >
                        <IonIcon icon={add} slot="start" />
                        Add
                      </IonButton>
                      <IonButton
                        color="danger"
                        onClick={() => this.clearActivityContent()}
                      >
                        <IonIcon icon={trash} slot="start" />
                        Cancel
                      </IonButton>
                    </IonContent>
                  </IonModal>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem class="itinerary_item">
              <IonGrid>
                <IonRow>
                  <IonCol class="day_header">
                    <h1>Day 2</h1>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem class="itinerary_item">
              <IonGrid>
                <IonRow>
                  <IonCol class="day_header">
                    <h1>Day 3</h1>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonList>
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
  }
};



export default Itinerary;