/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Competition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Competition_code_key" ON "Competition"("code");
