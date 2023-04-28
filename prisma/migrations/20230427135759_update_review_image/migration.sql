/*
  Warnings:

  - Added the required column `fileId` to the `review_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review_images" ADD COLUMN     "fileId" VARCHAR(50) NOT NULL;
