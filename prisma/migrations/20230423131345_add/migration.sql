-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_reviews_to_tags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_reviews_to_tags_AB_unique" ON "_reviews_to_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_reviews_to_tags_B_index" ON "_reviews_to_tags"("B");

-- AddForeignKey
ALTER TABLE "_reviews_to_tags" ADD CONSTRAINT "_reviews_to_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reviews_to_tags" ADD CONSTRAINT "_reviews_to_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
