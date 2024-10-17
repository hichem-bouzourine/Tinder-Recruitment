/*
  Warnings:

  - You are about to drop the column `cv` on the `Offre` table. All the data in the column will be lost.
  - You are about to drop the column `linkToVideo` on the `Offre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Etudiant" ADD COLUMN     "cv" TEXT,
ADD COLUMN     "linkToVideo" TEXT;

-- AlterTable
ALTER TABLE "Offre" DROP COLUMN "cv",
DROP COLUMN "linkToVideo";
