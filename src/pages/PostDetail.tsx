import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IonButton, IonContent, IonImg, IonPage} from "@ionic/react";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import classes from "./PostDetail.module.css";
import Footer from "../components/Footer";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface RecipeDTO {
  id: number;
  title: string;
  caption: string;
  averageRating: number;
  thumbnailLink: string;
  videoLink: string;
  uploadDate: string;
  posterId: number;
  posterUsername: string;
}

interface ImageDTO {
  original : string;
}

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [recipeDetail, setRecipeDetail] = useState<RecipeDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [recipeExtraPhotos, setRecipeExtraPhotos] = useState<ImageDTO[]>([]);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/recipes/${postId}`
        );
        const recipeData: RecipeDTO = response.data;
        setRecipeDetail(recipeData);
      } catch (error) {
        console.error("Error fetching recipe detail:", error);
      }
    };

    const fetchRecipeExtraPhotos = async () => {
      try{
        const response = await axios.get(`http://localhost:5114/api/File/photos/${postId}`);
        const list = response.data;
        const finalList = list.map((imageDTO: { uri: any; }) => ({
          original : imageDTO.uri
        }))
        
        setRecipeExtraPhotos(finalList);
        setLoading(false);
      }catch(error){
        console.error("Error fetching recipe photos:", error);
      }
    }

    fetchRecipeDetail();
    fetchRecipeExtraPhotos();
  }, [postId]);

  return (
    <>
      <Drawer contentId="detail" />
      <IonPage id="detail">
        <Header />
        <IonContent fullscreen className={classes.content}>
          <div className={classes.container}>
            {loading ? (
              <p>Loading...</p>
            ) : recipeDetail ? (
              <div>
                <h2>{recipeDetail.title}</h2>
                <div className={classes.user_info}>
                  <p className={classes.user_name}>
                    by {recipeDetail.posterUsername}
                  </p>
                  <IonButton className={classes.follow_button} size="small">
                    Follow
                  </IonButton>
                </div>
                {/* <IonImg
                  src={recipeDetail.thumbnailLink}
                  alt={recipeDetail.title}
                /> */}
                <div>
                  <ImageGallery showPlayButton = {false} infinite = {true} items = {recipeExtraPhotos} />
                </div>

                <video controls>
                  <source src={recipeDetail.videoLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <p>
                  <strong>Description:</strong> {recipeDetail.caption}
                </p>
                {/* <p>
                  <strong>Nutritional Value:</strong>{" "}
                  {recipeDetail.averageRating}
                </p> */}

                <div className={classes.slider_container}>
                  <div>
                    <div>Healthy</div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className={classes.slider_healthy}
                    />
                  </div>
                  <div>
                    <div>Nutritive</div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className={classes.slider_nutritive}
                    />
                  </div>
                  <div>
                    <div>Tasty</div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className={classes.slider_tasty}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default PostDetail;
