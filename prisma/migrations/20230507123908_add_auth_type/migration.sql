-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('PASSWORD', 'GOOGLE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authType" "AuthType" NOT NULL DEFAULT 'PASSWORD',
ALTER COLUMN "password" DROP NOT NULL;
