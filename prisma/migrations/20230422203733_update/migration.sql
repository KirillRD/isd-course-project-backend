/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `creations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "creations_title_key" ON "creations"("title");
