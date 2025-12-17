-- CreateEnum
CREATE TYPE "TopStatsCategory" AS ENUM ('KILLS_DEATHS', 'KILLS', 'REVIVES', 'ASSISTS', 'MATCHES', 'TIME_PLAYED');

-- CreateTable
CREATE TABLE "TopStats" (
    "id" TEXT NOT NULL,
    "category" "TopStatsCategory" NOT NULL,
    "user_id" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TopStats_category_key" ON "TopStats"("category");

-- AddForeignKey
ALTER TABLE "TopStats" ADD CONSTRAINT "TopStats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
