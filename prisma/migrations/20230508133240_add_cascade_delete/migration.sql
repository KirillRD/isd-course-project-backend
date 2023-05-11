-- DropForeignKey
ALTER TABLE "creation_ratings" DROP CONSTRAINT "creation_ratings_userId_fkey";

-- DropForeignKey
ALTER TABLE "issued_refresh_tokens" DROP CONSTRAINT "issued_refresh_tokens_userId_fkey";

-- DropForeignKey
ALTER TABLE "review_comments" DROP CONSTRAINT "review_comments_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "review_comments" DROP CONSTRAINT "review_comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "review_images" DROP CONSTRAINT "review_images_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_userId_fkey";

-- AddForeignKey
ALTER TABLE "issued_refresh_tokens" ADD CONSTRAINT "issued_refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_images" ADD CONSTRAINT "review_images_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creation_ratings" ADD CONSTRAINT "creation_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_comments" ADD CONSTRAINT "review_comments_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_comments" ADD CONSTRAINT "review_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
