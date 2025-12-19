/*
  Warnings:

  - You are about to drop the column `loses` on the `Stats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "loses",
ADD COLUMN     "losses" INTEGER NOT NULL DEFAULT 0;
