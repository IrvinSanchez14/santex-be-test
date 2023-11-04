/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_authorId_fkey";

-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_authorId_key" ON "Reviews"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
