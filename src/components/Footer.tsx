import { IonFooter, IonIcon } from "@ionic/react";
import classes from "./Footer.module.css";
import { addCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();

  return (
    <IonFooter className={classes.footer} translucent={true}>
      <IonIcon
        icon={addCircleOutline}
        className={classes.addButton}
        onClick={() => {
          history.push("/add");
        }}
      />
    </IonFooter>
  );
};