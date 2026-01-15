export interface UserReview {
  id: string;
  productId: string;
  userName: string;
  userImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: Date;
}

export interface AddReviewParams extends Pick<UserReview, 'title' | 'comment' | 'rating'> {}
