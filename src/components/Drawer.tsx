import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { IonButton, IonContent, IonFooter, IonMenu, IonText } from "@ionic/react";
import classes from "./Drawer.module.css";
import Button from "@mui/material/Button";
import { Follow } from "../model/Follow";
import { getFollowersUserName, getUserByUsername } from "../requests/userService";
import { UserShort } from "../model/user";

interface DrawerProps {
  contentId: string;
}

const Drawer = ({ contentId }: DrawerProps) => {
  const { username, logout } = useContext(AuthContext);

  return (
    <>
      <IonMenu contentId={contentId} type="overlay">
        <IonContent>
          <div className={classes.username}>
            <IonText
              style={{
                textAlign: "center",
                padding: "20px",
                margin: "auto",
                display: "block",
              }}
            >
              {username}
            </IonText>
            <IonText
              style={{
                textAlign: "left",
                padding: "20px",
            }}>
              My followers
            </IonText>
          </div>
        </IonContent>
        <IonFooter>
          <IonButton onClick={logout} expand="block" style={{padding: "5px", color: "white"}}>Logout</IonButton>
        </IonFooter>
      </IonMenu>
    </>
  );
};

export default Drawer;
