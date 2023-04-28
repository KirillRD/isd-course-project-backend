-- CreateTable
CREATE TABLE "creation_ratings" (
    "creationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "creation_ratings_pkey" PRIMARY KEY ("creationId","userId")
);

-- CreateTable
CREATE TABLE "_user_likes_on_reviews" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_likes_on_reviews_AB_unique" ON "_user_likes_on_reviews"("A", "B");

-- CreateIndex
CREATE INDEX "_user_likes_on_reviews_B_index" ON "_user_likes_on_reviews"("B");

-- AddForeignKey
ALTER TABLE "creation_ratings" ADD CONSTRAINT "creation_ratings_creationId_fkey" FOREIGN KEY ("creationId") REFERENCES "creations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creation_ratings" ADD CONSTRAINT "creation_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_likes_on_reviews" ADD CONSTRAINT "_user_likes_on_reviews_A_fkey" FOREIGN KEY ("A") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_likes_on_reviews" ADD CONSTRAINT "_user_likes_on_reviews_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
