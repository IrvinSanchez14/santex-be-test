/*
  Warnings:

  - A unique constraint covering the columns `[movieId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_movieId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_movieId_key" ON "Reviews"("movieId");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE;
