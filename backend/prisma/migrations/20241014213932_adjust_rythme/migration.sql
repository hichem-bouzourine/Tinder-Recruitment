/*
  Warnings:

  - Changed the type of `rythme` on the `Offre` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Offre" DROP COLUMN "rythme",
ADD COLUMN     "rythme" "Rythme" NOT NULL;
