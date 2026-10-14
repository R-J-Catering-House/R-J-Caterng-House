from pydantic import BaseModel, Field


class ReviewCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=120)
    rating: int = Field(ge=1, le=5)
    comment: str = Field(min_length=10, max_length=1000)