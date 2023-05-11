/*
  Warnings:

  - Made the column `imageId` on table `creations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `creations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "creations" ALTER COLUMN "imageId" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;
