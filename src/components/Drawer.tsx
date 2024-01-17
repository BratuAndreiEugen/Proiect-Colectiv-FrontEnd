import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonImg,
  IonList,
  IonMenu,
  IonText,
} from "@ionic/react";
import classes from "./Drawer.module.css";
import { useHistory } from "react-router";

interface DrawerProps {
  contentId: string;
}

const Drawer = ({ contentId }: DrawerProps) => {
  const { username, logout, followers, following } = useContext(AuthContext);
  const history = useHistory();

  const redirectToUserProfile = (followerUsername: string) => {
    if (followerUsername) {
      history.push(`/user/${followerUsername}`);
    } else {
      console.error("User ID not available.");
    }
  };

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
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <div style={{ flex: 1, textAlign: "center" }}>
              <IonText>My followers</IonText>
              <IonList style={{ marginTop: "10px" }}>
                {followers &&
                  followers.length > 0 &&
                  followers.map((user) => (
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "2px",
                        cursor: "pointer",
                      }}
                      onClick={() => redirectToUserProfile(user.username)}
                    >
                      <IonImg
                        src="/bucatar-incercuit.jpg"
                        className={classes.bucatar}
                      />
                      {user.username}
                    </div>
                  ))}
                {followers && followers.length <= 0 && <div>-</div>}
              </IonList>
            </div>
            <div style={{ flex: 1, textAlign: "center", marginTop: "20px" }}>
              <IonText>Following</IonText>
              <IonList style={{ marginTop: "10px" }}>
                {following &&
                  following.length > 0 &&
                  following?.map((user) => (
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "2px",
                        cursor: "pointer",
                      }}
                      key={username}
                      onClick={() => redirectToUserProfile(user.username)}
                    >
                      <IonImg
                        src="/bucatar-incercuit.jpg"
                        className={classes.bucatar}
                      />
                      {user.username}
                    </div>
                  ))}
                {following && following.length <= 0 && <div>-</div>}
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
