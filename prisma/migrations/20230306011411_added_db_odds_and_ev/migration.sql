/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagsOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnPosts" DROP CONSTRAINT "TagsOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnPosts" DROP CONSTRAINT "TagsOnPosts_tagId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagsOnPosts";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "type" TEXT,
    "sportsbook" TEXT,
    "odds" INTEGER NOT NULL,
    "dg_odds" INTEGER NOT NULL,
    "expected_value" INTEGER NOT NULL,
    "ammount_staked" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "result" TEXT NOT NULL,
    "custom_payout" INTEGER,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);
