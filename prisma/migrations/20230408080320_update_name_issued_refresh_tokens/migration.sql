/*
  Warnings:

  - You are about to drop the `IssuedRefreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IssuedRefreshToken" DROP CONSTRAINT "IssuedRefreshToken_userId_fkey";

-- DropTable
DROP TABLE "IssuedRefreshToken";

-- CreateTable
CREATE TABLE "issued_refresh_tokens" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "issued_refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "issued_refresh_tokens_refreshToken_key" ON "issued_refresh_tokens"("refreshToken");

-- AddForeignKey
ALTER TABLE "issued_refresh_tokens" ADD CONSTRAINT "issued_refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
