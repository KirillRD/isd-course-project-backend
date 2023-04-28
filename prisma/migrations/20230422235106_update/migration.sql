/*
  Warnings:

  - A unique constraint covering the columns `[title,category]` on the table `creations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "creations_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "creations_title_category_key" ON "creations"("title", "category");
