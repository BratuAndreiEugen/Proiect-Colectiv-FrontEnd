import React, { useContext, useEffect, useState } from "react";
import { IonHeader, IonToolbar, IonIcon, IonMenuButton } from "@ionic/react";
import { personCircleOutline, searchCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { getUserByUsername } from "../requests/userService";
import { AuthContext } from "../context/AuthProvider";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const { userId } = useContext(AuthContext);
  const history = useHistory();

  const redirectToUserProfile = () => {
    if (userId) {
      history.push(`/user/${userId}`);
    } else {
      console.error("User ID not available.");
    }
  };

  return (
    <IonHeader class={classes.header}>
      <IonToolbar>
        <div className={classes.headerContent}>
          <IonMenuButton></IonMenuButton>
          <div>
            <IonIcon
              icon={personCircleOutline}
              className={classes.button}
              onClick={redirectToUserProfile}
            />
            <IonIcon icon={searchCircleOutline} className={classes.button} />
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
