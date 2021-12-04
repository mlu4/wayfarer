import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonSpinner } from '@ionic/react';
import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Interest1 from './pages/interest_1';
import Interest2 from './pages/interest_2';
import Interest3 from './pages/interest_3';
import Dashboard from './pages/Dashboard';
import Itinerary from './pages/Itinerary';
import Calendar from './pages/calendar';
import BucketList from './pages/bucketlist';
import Recommendations from './pages/Recommendations';
import db from './firebaseConfig';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect } from 'react';
import { getCurrentUser } from './firebaseConfig'

interface CalendarState {
  currentlyEditingItinerary: {
    location: string,
    startDate: string,
    endDate: string
  }
}

class RoutingSystem extends React.Component {
  state: CalendarState

  constructor(props: any) {
    super(props)
    this.state = {
      currentlyEditingItinerary: {
          location: 'PITTSBURGH',
          startDate: "2021-12-10",
          endDate: "2021-12-10"
      }
    }
  }

  iterChange = (cal: any) => {
    console.log(cal)
    //console.log('iter was changed')
    //this.setState({...this.state, location: cal.state.location, startDate: cal.state.startDate, endDate: cal.state.endDate})
  }

  render() {

      return (
        <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/interest_1" component={Interest1} exact />
              <Route path="/interest_2" component={Interest2} exact />
              <Route path="/interest_3" component={Interest3} exact />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/calendar" component ={(cal: any) => <Calendar onChange={this.iterChange(cal)} />} exact />
              <Route path="/bucketlist" component={BucketList} exact />
              <Route path="/itinerary" component={() => <Itinerary itinerary={this.state.currentlyEditingItinerary}/>} exact />
              <Route path="/recommendations" component={Recommendations} exact />
            </IonRouterOutlet>
          </IonReactRouter>
      )
    }
}

const App: React.FC = () => {

  const [busy, setBusy] = useState(true)
  useEffect(() => {
      db.collection("user_ids").get().then(querySnapshot => {
        console.log(querySnapshot.docs.map(doc => doc.data()))
      })
      getCurrentUser().then(user => {
        console.log(user)
        setBusy(false)
      })
  }, [])

  return <IonApp>{busy ? <IonSpinner /> : <RoutingSystem />}</IonApp>
}

export default App;
