/*
  Warnings:

  - You are about to drop the `_CompetenceToEtudiant` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `etat` on the `Candidature` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `poste` on the `Recruteur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'RECRUITER');

-- CreateEnum
CREATE TYPE "Rythme" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "Poste" AS ENUM ('HR', 'CEO', 'CTO');

-- CreateEnum
CREATE TYPE "EtatCandidature" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "_CompetenceToEtudiant" DROP CONSTRAINT "_CompetenceToEtudiant_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompetenceToEtudiant" DROP CONSTRAINT "_CompetenceToEtudiant_B_fkey";

-- AlterTable
ALTER TABLE "Candidature" DROP COLUMN "etat",
ADD COLUMN     "etat" "EtatCandidature" NOT NULL;

-- AlterTable
ALTER TABLE "Recruteur" DROP COLUMN "poste",
ADD COLUMN     "poste" "Poste" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "_CompetenceToEtudiant";

-- CreateTable
CREATE TABLE "EtudiantCompetence" (
    "etudiantId" INTEGER NOT NULL,
    "competenceId" INTEGER NOT NULL,

    CONSTRAINT "EtudiantCompetence_pkey" PRIMARY KEY ("etudiantId","competenceId")
);

-- AddForeignKey
ALTER TABLE "EtudiantCompetence" ADD CONSTRAINT "EtudiantCompetence_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "Etudiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtudiantCompetence" ADD CONSTRAINT "EtudiantCompetence_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
