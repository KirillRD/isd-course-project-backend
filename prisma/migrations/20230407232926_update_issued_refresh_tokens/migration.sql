/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `IssuedRefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IssuedRefreshToken_refreshToken_key" ON "IssuedRefreshToken"("refreshToken");
