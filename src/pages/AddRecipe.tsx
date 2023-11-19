import {
  IonContent,
  IonPage,
  IonIcon,
  IonButton,
  IonLabel,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import Header from "../components/Header";
import { imageOutline, imagesOutline, videocamOutline } from "ionicons/icons";
import classes from "./AddRecipe.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router";
import Drawer from "../components/Drawer";
import { useContext, useRef, useState } from "react";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";
import {
  addRecipe,
  uploadFile,
  uploadFileExtra,
} from "../requests/recipeService";
import { getUserByUsername } from "../requests/userService";

const AddRecipe: React.FC = () => {
  const { userId, username } = useContext(AuthContext);
  const isPhone = useMediaQuery("(max-width:768px)");
  const thumbnailFileInput = useRef(null);
  const videoFileInput = useRef(null);
  const imagesFilesInput = useRef(null);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [imagesFiles, setImagesFiles] = useState<FileList>();
  const [videoFile, setVideoFile] = useState<File>();

  let imagesString = "";
  if (imagesFiles)
    for (let idx = 0; idx < imagesFiles.length; ++idx) {
      const imageName = imagesFiles[idx].name;
      if (idx == imagesFiles.length - 1) imagesString += imageName;
      else imagesString += imageName + ", ";
    }

  const sliceLength = isPhone ? 15 : 35;
  if (imagesString.length > sliceLength) {
    imagesString = imagesString.slice(0, sliceLength);
    imagesString += "..";
  }

  let thumbnailString = "";
  if (thumbnailFile) thumbnailString = thumbnailFile.name;
  if (thumbnailString.length > sliceLength) {
    thumbnailString = thumbnailString.slice(0, sliceLength);
    thumbnailString += "..";
  }

  const handlePost = async () => {
    console.log(thumbnailString);
    if (!thumbnailFile) return;
    const loggeUser = await getUserByUsername(localStorage.getItem("username")!);
    try {
      const data = {
        title,
        caption: description,
        posterId: localStorage.getItem("username") ? loggeUser.id : userId,
        videoLink: "",
        thumbnailLink: "",
      };

      let videoLink = "";
      if (videoFile) {
        const formData = new FormData();
        formData.append("file", videoFile);
        const response = await uploadFile(formData);
        videoLink = response;
      }

      let thumbnailLink = "";
      const formData = new FormData();
      formData.append("file", thumbnailFile);
      const response = await uploadFile(formData);
      thumbnailLink = response;

      data.thumbnailLink = thumbnailLink;
      data.videoLink = videoLink;

      const recipeId = await addRecipe(JSON.stringify(data));
      if (imagesFiles)
        for (let idx = 0; idx < imagesFiles?.length; ++idx) {
          const imageFile = imagesFiles[idx];
          const formData = new FormData();
          formData.append("file", imageFile);
          await uploadFileExtra(formData, recipeId);
        }
      history.push(`/user/${username}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Drawer contentId="main-content" />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen className={classes.content}>
          <div className={classes.form}>
            <div className={classes.row}>
              <IonLabel>Title*:</IonLabel>
              <IonInput
                placeholder="Enter title"
                shape="round"
                fill="outline"
                type="text"
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}
              />
            </div>
            <div className={classes.row}>
              <IonLabel>Thumbnail*:</IonLabel>
              <input
                ref={thumbnailFileInput}
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) setThumbnailFile(e.target.files[0]);
                }}
              />
              <IonButton
                shape="round"
                onClick={() => {
                  // @ts-ignore
                  thumbnailFileInput?.current?.click();
                }}
                className={classes.button}
              >
                <IonIcon slot="start" icon={imageOutline}></IonIcon>
                {thumbnailFile ? thumbnailString : "Upload"}
              </IonButton>
            </div>
            <div className={classes.row}>
              <IonLabel>Video:</IonLabel>
              <input
                ref={videoFileInput}
                hidden
                type="file"
                accept="video/mp4,video/x-m4v,video/*"
                onChange={(e) => {
                  if (e.target.files) setVideoFile(e.target.files[0]);
                }}
              />
              <IonButton
                shape="round"
                onClick={() => {
                  // @ts-ignore
                  videoFileInput?.current?.click();
                }}
                className={classes.button}
              >
                <IonIcon slot="start" icon={videocamOutline}></IonIcon>
                {videoFile ? videoFile.name : "Upload"}
              </IonButton>
            </div>
            <div className={classes.row}>
              <IonLabel>Photos:</IonLabel>
              <input
                ref={imagesFilesInput}
                hidden
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) setImagesFiles(e.target.files);
                }}
              />
              <IonButton
                shape="round"
                onClick={() => {
                  // @ts-ignore
                  imagesFilesInput?.current?.click();
                }}
                className={classes.button}
              >
                <IonIcon slot="start" icon={imagesOutline}></IonIcon>
                {imagesFiles ? imagesString : "Upload"}
              </IonButton>
            </div>
            <div className={classes.row} style={{ marginTop: "5px" }}>
              <IonLabel>Description:</IonLabel>
              <IonTextarea
                color="primary"
                fill="outline"
                shape="round"
                placeholder="Enter description"
                rows={2}
                value={description}
                className={classes.description}
                onIonChange={(e) => setDescription(e.detail.value!)}
              />
            </div>
            <IonButton
              expand="full"
              className={classes.button}
              shape="round"
              onClick={handlePost}
              style={{ marginTop: "0.5rem" }}
            >
              Post
            </IonButton>
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default AddRecipe;
