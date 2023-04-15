-- AlterTable
ALTER TABLE "users" ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "roles" SET DEFAULT ARRAY['USER']::"Role"[];
