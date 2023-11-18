import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login";
import { PrivateRoute } from "./context/PrivateRoute";
import Register from "./pages/Register";
import FeedPage from "./pages/Feed";
import AddRecipe from "./pages/AddRecipe";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/" render={() => <Redirect to="/home"/>} exact/>
          <PrivateRoute path="/home" component={FeedPage} exact/>
          <PrivateRoute path="/add" component={AddRecipe} exact/>
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
