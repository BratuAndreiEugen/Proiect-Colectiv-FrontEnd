import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { IonButton, IonContent, IonFooter, IonMenu, IonText } from "@ionic/react";
import classes from "./Drawer.module.css";
import Button from "@mui/material/Button";

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
