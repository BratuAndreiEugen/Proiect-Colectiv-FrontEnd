import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { IonContent, IonFooter, IonMenu, IonText } from "@ionic/react";
import classes from "./Drawer.module.css";
import Button from "@mui/material/Button";

interface DrawerProps {
  contentId: string;
}

const Drawer = ({contentId}: DrawerProps) => {
  const {username, logout} = useContext(AuthContext);

  return (
    <>
      <IonMenu contentId={contentId} type="overlay">
        <IonContent>
          <div className={classes.username}>
            <IonText>{username}</IonText>
          </div>
        </IonContent>
        <IonFooter>
          <Button onClick={logout}>Logout</Button>
        </IonFooter>
      </IonMenu>
    </>
  );
};

export default Drawer;
