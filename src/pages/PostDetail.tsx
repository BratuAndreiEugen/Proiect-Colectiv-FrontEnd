import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IonButton, IonContent, IonImg, IonPage } from "@ionic/react";
import Header from "../components/Header";
import "./PostDetail.css";
import Drawer from "../components/Drawer";

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

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [recipeDetail, setRecipeDetail] = useState<RecipeDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

    fetchRecipeDetail();
  }, [postId]);

  return (
    <>
      <Drawer contentId="detail" />
      <IonPage id="detail">
        <Header />
        <IonContent fullscreen>
          <div className="container">
            {loading ? (
              <p>Loading...</p>
            ) : recipeDetail ? (
              <div>
                <h2>{recipeDetail.title}</h2>
                <div className="user-info">
                  <p className="user-name">by {recipeDetail.posterUsername}</p>
                  <IonButton className="follow-button" size="small">
                    FOLLOW
                  </IonButton>
                </div>
                <IonImg
                  src={recipeDetail.thumbnailLink}
                  alt={recipeDetail.title}
                />

                <video controls>
                  <source src={recipeDetail.videoLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <p>
                  <strong>Description:</strong> {recipeDetail.caption}
                </p>
                <p>
                  <strong>Nutritional Value:</strong>{" "}
                  {recipeDetail.averageRating}
                </p>

                <div className="slider-container">
                  <div>
                    <span>Healthy </span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className="slider-healthy"
                    />
                  </div>
                  <div>
                    <span>Nutritive</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className="slider-nutritive"
                    />
                  </div>
                  <div>
                    <span>Tasty </span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className="slider-tasty"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default PostDetail;
