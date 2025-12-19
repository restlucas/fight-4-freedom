/*
  Warnings:

  - You are about to drop the column `accuracy` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `headshots` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `killsPerMatch` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `killsPerMinute` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `totalXp` on the `Stats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "accuracy",
DROP COLUMN "headshots",
DROP COLUMN "killsPerMatch",
DROP COLUMN "killsPerMinute",
DROP COLUMN "totalXp",
ADD COLUMN     "hsPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "objectivesCaptured" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "objectivesDestroyed" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ClanStats" (
    "id" TEXT NOT NULL,
    "totalMembers" INTEGER NOT NULL DEFAULT 0,
    "totalMedals" INTEGER NOT NULL DEFAULT 0,
    "averageKd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageWins" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClanStats_pkey" PRIMARY KEY ("id")
);
