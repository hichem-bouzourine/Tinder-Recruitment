/*
  Warnings:

  - You are about to drop the column `skills` on the `Etudiant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Etudiant" DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "Competence" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Competence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidature" (
    "id" SERIAL NOT NULL,
    "etudiantId" INTEGER NOT NULL,
    "offreId" INTEGER NOT NULL,
    "etat" TEXT NOT NULL,

    CONSTRAINT "Candidature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompetenceToEtudiant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidature_etudiantId_offreId_key" ON "Candidature"("etudiantId", "offreId");

-- CreateIndex
CREATE UNIQUE INDEX "_CompetenceToEtudiant_AB_unique" ON "_CompetenceToEtudiant"("A", "B");

-- CreateIndex
CREATE INDEX "_CompetenceToEtudiant_B_index" ON "_CompetenceToEtudiant"("B");

-- AddForeignKey
ALTER TABLE "Candidature" ADD CONSTRAINT "Candidature_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "Etudiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidature" ADD CONSTRAINT "Candidature_offreId_fkey" FOREIGN KEY ("offreId") REFERENCES "Offre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetenceToEtudiant" ADD CONSTRAINT "_CompetenceToEtudiant_A_fkey" FOREIGN KEY ("A") REFERENCES "Competence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetenceToEtudiant" ADD CONSTRAINT "_CompetenceToEtudiant_B_fkey" FOREIGN KEY ("B") REFERENCES "Etudiant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
