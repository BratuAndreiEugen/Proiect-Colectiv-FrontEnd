import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { IonButton, IonContent, IonImg, IonPage} from "@ionic/react";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import classes from "./PostDetail.module.css";
import Footer from "../components/Footer";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import RatingDisplay from "../components/RatingDisplay";
import Tooltip from '@mui/material/Tooltip';
import ShortRatingDisplay from "../components/ShortRatingDisplay";
import { addRecipe, updateRating } from "../requests/recipeService";
import { Rating, RatingRequest } from "../model/Rating";

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
  const history = useHistory();
  const [healthy, setHealthy] = useState(0);
  const [nutritive, setNutritive] = useState(0);
  const [tasty, setTasty] = useState(0);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/recipes/${postId}`
        );
        const recipeData: RecipeDTO = response.data;
        setRecipeDetail(recipeData);
        setLoading(false);
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

  const redirectToUserPage = async () => {
    try{
      history.push(`/user/${recipeDetail?.posterUsername}`);
    }catch{
      console.log("Redirect FAILED in PostDetail.tsx");
    }
  }

  const postNewRating = async () => {
    try{
      const userId = localStorage.getItem("id");

      if(recipeDetail?.id && userId){
        const data: RatingRequest = {
          healthy: healthy,
          nutritive: nutritive,
          tasty: tasty,
          userId: parseInt(userId),
        }

        await updateRating(data, recipeDetail?.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //limit calls
  const [debouncedHealthy, setDebouncedHealthy] = useState(0);
  const [debouncedNutritive, setDebouncedNutritive] = useState(0);
  const [debouncedTasty, setDebouncedTasty] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedHealthy(healthy);
      setDebouncedNutritive(nutritive);
      setDebouncedTasty(tasty);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [healthy, nutritive, tasty]);

  useEffect(() => {
    postNewRating();
  }, [debouncedHealthy, debouncedNutritive, debouncedTasty]);

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
              <div style={{ position: "relative" }}>
                <h2>{recipeDetail.title}</h2>
                <div className={classes.user_info}>
                  <p className={classes.user_name} onClick={redirectToUserPage}>
                    by {recipeDetail.posterUsername}
                  </p>
                  <IonButton className={classes.follow_button} size="small">
                    Follow
                  </IonButton>
                </div>
                <ShortRatingDisplay rating={recipeDetail.averageRating}/>
                {/* <IonImg
                  src={recipeDetail.thumbnailLink}
                  alt={recipeDetail.title}
                /> */}
                <div>
                  <ImageGallery showPlayButton = {false} infinite = {true} items = {recipeExtraPhotos}/>
                </div>

                <video controls>
                  <source src={recipeDetail.videoLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <p>
                  <div dangerouslySetInnerHTML={{ __html: recipeDetail.caption }}></div>
                </p>
                {/* <p>
                  <strong>Nutritional Value:</strong>{" "}
                  {recipeDetail.averageRating}
                </p> */}

                <div className={classes.slider_container}>
                  <div>
                    <div>Healthy</div>
                    <div className={classes.flexRow}>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={healthy}
                        onChange={(e) => setHealthy(parseInt(e.target.value))}
                        className={classes.slider_healthy}
                      />
                      <RatingDisplay rating={healthy} type="healthy"/>
                    </div>
                  </div>
                  <div>
                    <div>Nutritive</div>
                    <div className={classes.flexRow}>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={nutritive}
                        onChange={(e) => setNutritive(parseInt(e.target.value))}
                        className={classes.slider_nutritive}
                      />
                      <RatingDisplay rating={nutritive} type="nutritive"/>
                    </div>
                  </div>
                  <div>
                    <div>Tasty</div>
                    <div className={classes.flexRow}>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={tasty}
                        onChange={(e) => setTasty(parseInt(e.target.value))}
                        className={classes.slider_tasty}
                      />
                      <RatingDisplay rating={tasty} type="tasty"/>
                    </div>
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
