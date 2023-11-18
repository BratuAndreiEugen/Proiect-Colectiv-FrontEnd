import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IonButton, IonImg } from "@ionic/react";
import Header from "../components/Header"; // Import your Header component
import './PostDetail.css'; // Import your CSS file

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
    // Other properties...
}

const PostDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [recipeDetail, setRecipeDetail] = useState<RecipeDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/recipes/${postId}`);
                const recipeData: RecipeDTO = response.data;
                setRecipeDetail(recipeData);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching recipe detail:", error);
            }
        };

        fetchRecipeDetail();
    }, [postId]);

    return (
        <>
            <Header /> {/* Include the Header component */}
            <div className="container">
                {loading ? (
                    <p>Loading...</p>
                ) : recipeDetail ? (
                    <div>
                        <h2>{recipeDetail.title}</h2>
                        <div className="user-info">
                            <p className="user-name">by {recipeDetail.posterUsername}</p>
                            <IonButton className="follow-button" size="small">FOLLOW</IonButton>
                        </div>
                        <IonImg src={recipeDetail.thumbnailLink} alt={recipeDetail.title} />

                        {/* Video Player */}
                        <video controls>
                            <source src={recipeDetail.videoLink} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Nutritional Value & Description */}
                        <p><strong>Description:</strong> {recipeDetail.caption}</p>
                        <p><strong>Nutritional Value:</strong> {recipeDetail.averageRating}</p>

                        <div className="slider-container">
                            <div>
                                <span>Healthy  </span>
                                <input type="range" min="1" max="10" defaultValue="5" className="slider-healthy" />
                            </div>
                            <div>
                                <span>Nutritive</span>
                                <input type="range" min="1" max="10" defaultValue="5" className="slider-nutritive" />
                            </div>
                            <div>
                                <span>Tasty    </span>
                                <input type="range" min="1" max="10" defaultValue="5" className="slider-tasty" />
                            </div>
                        </div>

                        {/* Rest of your PostDetail content */}
                        {/* ... */}
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </>
    );
};

export default PostDetail;
