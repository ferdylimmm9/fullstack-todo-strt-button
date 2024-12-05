/*
  Warnings:

  - The primary key for the `tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "tasks_id_key" ON "tasks"("id");
