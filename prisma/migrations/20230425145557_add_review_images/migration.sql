-- CreateTable
CREATE TABLE "review_images" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "review_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "review_images" ADD CONSTRAINT "review_images_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
