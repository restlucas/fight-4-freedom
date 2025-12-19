-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('PC', 'PLAYSTATION', 'XBOX');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Ranks" AS ENUM ('RECRUTA', 'SOLDADO', 'CABO', 'SARGENTO', 'TENENTE', 'CAPITAO', 'MAJOR', 'CORONEL', 'GENERAL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'BANNED');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY', 'UNIQUE');

-- CreateEnum
CREATE TYPE "TopStatsCategory" AS ENUM ('KILLS_DEATHS', 'KILLS', 'REVIVES', 'ASSISTS', 'MATCHES', 'TIME_PLAYED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "ea_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "avatar" TEXT,
    "bio" TEXT,
    "rank" "Ranks" NOT NULL DEFAULT 'RECRUTA',
    "platform" "Platform" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "trackergg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "hsPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "revives" INTEGER NOT NULL DEFAULT 0,
    "killDeath" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "objectivesCaptured" INTEGER NOT NULL DEFAULT 0,
    "objectivesDestroyed" INTEGER NOT NULL DEFAULT 0,
    "matchesPlayed" INTEGER NOT NULL DEFAULT 0,
    "winPercent" TEXT,
    "bestClass" TEXT,
    "timePlayed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Medal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMedal" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "medal_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMedal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopStats" (
    "id" TEXT NOT NULL,
    "category" "TopStatsCategory" NOT NULL,
    "user_id" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ea_id_key" ON "User"("ea_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_user_id_key" ON "Stats"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMedal_user_id_medal_id_key" ON "UserMedal"("user_id", "medal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_token_key" ON "Invite"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TopStats_category_key" ON "TopStats"("category");

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedal" ADD CONSTRAINT "UserMedal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedal" ADD CONSTRAINT "UserMedal_medal_id_fkey" FOREIGN KEY ("medal_id") REFERENCES "Medal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopStats" ADD CONSTRAINT "TopStats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
