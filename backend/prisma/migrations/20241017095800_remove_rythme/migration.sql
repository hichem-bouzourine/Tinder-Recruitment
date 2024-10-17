/*
  Warnings:

  - You are about to drop the column `dateDebut` on the `Offre` table. All the data in the column will be lost.
  - You are about to drop the column `rythme` on the `Offre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offre" DROP COLUMN "dateDebut",
DROP COLUMN "rythme";
