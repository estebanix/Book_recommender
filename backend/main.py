from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Define request body schema
class BookRequest(BaseModel):
    title: str

# Define response schema
class RecommendationsResponse(BaseModel):
    recommendations: List[str]

@app.post("/recommend", response_model=RecommendationsResponse)
async def recommend(book: BookRequest):
    """
    Dummy API endpoint for book recommendations.
    Replace this stub with real ML model inference.
    """

    # TODO: Load and query your ML recommendation model here using book.title
    # Example:
    # recommendations = model.get_recommendations(book.title)

    # For now, return hardcoded dummy recommendations:
    dummy_recommendations = [
        "Dummy Book 1",
        "Dummy Book 2",
        "Dummy Book 3"
    ]

    return {"recommendations": dummy_recommendations}
