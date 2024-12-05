/*
  Warnings:

  - You are about to drop the column `is_completed` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `status` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('pending', 'completed');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "is_completed",
ADD COLUMN     "status" "TaskStatus" NOT NULL;
