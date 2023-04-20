/*
  Warnings:

  - You are about to drop the column `signupDate` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CreationCategory" AS ENUM ('MOVIES', 'TV', 'BOOKS', 'MUSIC', 'GAMES');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "signupDate",
ADD COLUMN     "signUpDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "creations" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "category" "CreationCategory" NOT NULL,

    CONSTRAINT "creations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "creationId" INTEGER NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "body" TEXT NOT NULL,
    "grade" SMALLINT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_creationId_fkey" FOREIGN KEY ("creationId") REFERENCES "creations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
