import {
  IonHeader,
  IonToolbar,
  IonText,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonMenuToggle,
  IonInput,
  InputChangeEventDetail,
  IonImg,
} from "@ionic/react";
import classes from "./Header.module.css";
import { personCircleOutline, searchCircleOutline } from "ionicons/icons";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Height, Input } from "@mui/icons-material";
import { useHistory } from "react-router";
import { getUserByUsername } from "../requests/userService";

function Header() {
  const { username } = useContext(AuthContext);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  const searchClick = async () => {
    if (!isOpenSearch) {
      setIsOpenSearch(!isOpenSearch);
    } else {
      if (searchValue) {
        history.push(`/user/${searchValue}`);
      }
    }
  };

  const redirectToUserProfile = () => {
    if (username) {
      history.push(`/user/${username}`);
    } else {
      console.error("User ID not available.");
    }
  };

  return (
    <IonHeader class={classes.header}>
      <IonToolbar>
        <div className={classes.headerContent}>
          <IonMenuButton></IonMenuButton>
          <div className={classes.headerButtons}>
            <IonInput
              fill="outline"
              placeholder="Search"
              className={!isOpenSearch ? classes.invisible : ""}
              value={searchValue}
              onIonChange={(event: CustomEvent<InputChangeEventDetail>) => {
                setSearchValue(event.detail.value!);
              }}
            ></IonInput>
            <IonIcon
              onClick={searchClick}
              icon={searchCircleOutline}
              className={classes.button}
            />
            <IonImg
              src="/bucatar-incercuit.jpg"
              className={classes.bucatar}
              onClick={redirectToUserProfile}
            />
            {/* <IonImg
            src="/bucatar.jpeg"
            className={classes.button}
            /> */}
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;
