  import {
  IonHeader,
  IonToolbar,
  IonText,
  IonButton,
  IonIcon, IonMenuButton, IonMenuToggle, IonInput, InputChangeEventDetail,
} from "@ionic/react";
  import classes from "./Header.module.css";
  import { personCircleOutline, searchCircleOutline } from "ionicons/icons";
  import { FormEventHandler, useContext, useEffect, useState } from "react";
  import { AuthContext } from "../context/AuthProvider";
  import { Input } from "@mui/icons-material";
  import { useHistory } from "react-router";

  function Header() {
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();

    useEffect(() => {
      console.log(searchValue)
    }, [searchValue]);

    const searchClick = () => {
      if(!isOpenSearch){
        setIsOpenSearch(!isOpenSearch)
      }else{
        history.push(`/user/${searchValue}`);
      }
    }

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
              <IonIcon onClick={searchClick} icon={searchCircleOutline} className={classes.button} />
              <IonIcon icon={personCircleOutline} className={classes.button} />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
    );
  }

  export default Header;
