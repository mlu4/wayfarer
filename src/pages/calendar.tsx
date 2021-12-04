import { IonContent, IonDatetime, IonItem, IonSelect, IonSelectOption, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonText, IonRouterOutlet } from '@ionic/react';
import { calendar, home, starOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import BucketList from './bucketlist';
import '../theme/Dashboard.css';
import { useState } from 'react'
import { Component } from 'react'

interface CalendarState {
  location: string,
  startDate: string,
  endDate: string
}

interface CalendarProps {
  // function
  onChange: any
}
class Calendar extends Component {

  state: CalendarState
  props: CalendarProps

  constructor(props: CalendarProps) {
    super(props)
    this.props = props
    console.log(props.onChange as any)
    this.state = {
      location: 'PITTSBURGH',
      startDate: "2021-12-10",
      endDate: "2021-12-10"
    }
  }
  render() {
    return (
      <IonPage>
        <IonHeader class="ion-no-border">
          <IonToolbar>
            <IonTitle class="small_banner">Wayfarer</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="body">
          <IonText class="cal_heading">
            <h1>PLAN A NEW TRIP</h1>
          </IonText>
          <IonText class="cal_subtitle">
            <p>Create itineraries, view recommendations, and book activities for your upcoming trip</p>
          </IonText>
          <IonItem>
            <IonLabel position="stacked">Where to?</IonLabel>
            <IonSelect onIonChange={(ev) => {
              if(ev != null && ev.target != null && (ev.target as any).value != null) {
                const val = (ev.target as any).value
                if(val != null) {
                  this.setState({...this.state, location: val})
                }
              }
            }} placeholder="Select One">
              <IonSelectOption value={this.state.location}>{this.state.location}</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Start Date</IonLabel>
            <IonDatetime onIonChange={(ev) => {
              if (ev != null && ev.target != null && (ev.target as any).value != null) {
                const val = (ev.target as any).value
                if(val != null) {
                  this.setState({...this.state, startDate: val})
                }
              }
            }}
            value={this.state.startDate} placeholder="Select Date" min={this.state.startDate} max="3000-12-31"></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">End Date</IonLabel>
            <IonDatetime onIonChange={(ev) => {
              if (ev != null && ev.target != null && (ev.target as any).value != null) {
                const val = (ev.target as any).value
                if(val != null) {
                  this.setState({...this.state, endDate: val})
                }
              }
            }}
            value={this.state.endDate} placeholder="Select Date" min={this.state.startDate} max="3000-12-31"></IonDatetime>
          </IonItem>
          <IonButton class="planningbtn" href="/Itinerary" onClick={() => {
              //console.log(this.state)
              const loc = this.state.location
              const startDate = this.state.startDate
              const endDate = this.state.endDate
              this.props.onChange();
            }}>START PLANNING</IonButton>
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


export default Calendar;