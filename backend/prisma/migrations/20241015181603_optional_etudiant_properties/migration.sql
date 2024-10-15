-- DropForeignKey
ALTER TABLE "Etudiant" DROP CONSTRAINT "Etudiant_universiteId_fkey";

-- AlterTable
ALTER TABLE "Etudiant" ALTER COLUMN "universiteId" DROP NOT NULL,
ALTER COLUMN "anneeEtude" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_universiteId_fkey" FOREIGN KEY ("universiteId") REFERENCES "Universite"("id") ON DELETE SET NULL ON UPDATE CASCADE;
