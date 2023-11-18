import {
  IonHeader,
  IonToolbar,
  IonText,
  IonButton,
  IonIcon, IonMenuButton, IonMenuToggle,
} from "@ionic/react";
import classes from "./Header.module.css";
import { personCircleOutline, searchCircleOutline } from "ionicons/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import {Link} from "react-router-dom";

function Header() {

  return (
    <IonHeader class={classes.header}>
      <IonToolbar>
        <div className={classes.headerContent}>
          <IonMenuButton></IonMenuButton>
          <div>
            <Link to={`/user/${username}`} className={classes.button}>
              <IonIcon icon={personCircleOutline} />
            </Link>
            <IonIcon icon={searchCircleOutline} className={classes.button} />
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;
