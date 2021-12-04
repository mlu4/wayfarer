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
  IonTextarea
} from "@ionic/react";
import React, { Component } from "react";
import { Redirect, Route } from 'react-router-dom';
import { calendar, home, starOutline } from 'ionicons/icons';
import Calendar from './calendar';
import Dashboard from './Dashboard';
import { add, close, checkmark, trash } from "ionicons/icons";

class BucketList extends Component {
  state = {
    todoList: [
      {
        content: "Take a gondola ride in Venice, Italy",
        finished: false
      },
      {
        content: "Hike Machu Picchu",
        finished: false
      },
      {
        content: "Go camping in Joshua Tree",
        finished: false
      },
      {
        content: "See the Northern Lights in Iceland",
        finished: false
      },
      {
        content: "Eat sushi in Japan",
        finished: false
      },
      {
        content: "Drive along the Amalfi Coast - Italy",
        finished: false
      }
    ],
    modalOpen: false,
    newTodoContent: ""
  };

  componentDidMount() {
    // load todos from local storage
    let todos = localStorage.getItem("todoList");
    if (todos !== null) {
      this.setState({
        todoList: JSON.parse(todos)
      });
    }
  }

  persistTodosToStorage = (newTodos: any) => {
    // persist todos to local storage
    localStorage.setItem("todoList", JSON.stringify(newTodos));
  };

  todoContentInputHandler = (event: any) => {
    this.setState({
      newTodoContent: event.target.value
    });
  };

  clearNewTodoContent = () => {
    this.setState({ newTodoContent: "" });
  };

  addItemToList = () => {
    if (this.state.newTodoContent === "") {
      return;
    }
    let newTodoList = [...this.state.todoList];
    newTodoList.push({
      content: this.state.newTodoContent,
      finished: false
    });

    this.setState({
      todoList: newTodoList,
      newTodoContent: ""
    });

    this.persistTodosToStorage(newTodoList);
  };

  switchItemCheckedStatus = (idx: number) => {
    let newTodoList = [...this.state.todoList];
    newTodoList[idx].finished = !newTodoList[idx].finished;
    this.setState({
      todoList: newTodoList
    });

    this.persistTodosToStorage(newTodoList);
  };

  listRef: any;

  removeItemFromList = (idx: number) => {
    let newTodoList = [...this.state.todoList];
    newTodoList.splice(idx, 1);
    this.setState({
      todoList: newTodoList
    });

    this.persistTodosToStorage(newTodoList);
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
        <IonContent class="body">
          <IonText class="bl_heading">
            <h1>ULTIMATE BUCKET LIST</h1>
          </IonText>
          <p>Keep track of all of the destinations and activities you want to complete in your lifetime!</p>
          <p>We've listed a few travel goals to help you get started:</p>
          <IonList ref={me => (this.listRef = me)}>
            {this.state.todoList.map((todoItem, idx) => {
              return (
                <IonItemSliding key={idx}>
                  <IonItem>
                    <IonCheckbox
                      onClick={() => this.switchItemCheckedStatus(idx)}
                      slot="start"
                      value={todoItem.content}
                      checked={todoItem.finished}
                    />
                    <IonLabel>{todoItem.content}</IonLabel>
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
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => this.toggleModalOpenStatus()}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>

          <IonModal isOpen={this.state.modalOpen}>
            <IonHeader>
              <IonToolbar>
                <IonButtons>
                  <IonTitle>Add a bucket list item</IonTitle>
                  <IonButton onClick={() => this.toggleModalOpenStatus()}>
                    <IonIcon icon={close} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonTextarea
                placeholder="what will you do next..."
                value={this.state.newTodoContent}
                onIonChange={e => this.todoContentInputHandler(e)}
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
                onClick={() => this.clearNewTodoContent()}
              >
                <IonIcon icon={trash} slot="start" />
                Cancel
              </IonButton>
            </IonContent>
          </IonModal>
        </IonContent>
        <IonToolbar>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/dashboard" component={Dashboard} exact={true} />
              <Route path="/calendar" component={Calendar} exact={true} />
              <Route path="/" render={() => <Redirect to="/bucketlist" />} exact={true} />
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
}

export default BucketList;