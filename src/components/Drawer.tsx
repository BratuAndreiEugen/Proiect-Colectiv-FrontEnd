import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { getFollowingUsers } from "../requests/userService";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonList,
  IonMenu,
  IonText,
} from "@ionic/react";
import classes from "./Drawer.module.css";

interface DrawerProps {
  contentId: string;
}

const Drawer = ({ contentId }: DrawerProps) => {
  const { username, logout, userId } = useContext(AuthContext);
  const [following, setFollowing] = useState<[]>([]);

  useEffect(() => {
    const getFollowing = async () => {
      if (userId) {
        const followingList = await getFollowingUsers(userId);
        setFollowing(followingList);
      }
    };

    getFollowing();
  }, []);

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <div style={{ flex: 1, textAlign: "center" }}>
              <IonText>My followers</IonText>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <IonText>Following</IonText>
              <IonList>
                <IonText>gabi_mirgea</IonText>
              </IonList>
            </div>
          </div>
        </IonContent>
        <IonFooter>
          <IonButton
            onClick={logout}
            expand="block"
            style={{ padding: "5px", color: "white" }}
          >
            Logout
          </IonButton>
        </IonFooter>
      </IonMenu>
    </>
  );
};

export default Drawer;
