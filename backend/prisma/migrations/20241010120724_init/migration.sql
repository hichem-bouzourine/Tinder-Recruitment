-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etudiant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "universiteId" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "anneeEtude" TEXT NOT NULL,
    "skills" TEXT[],

    CONSTRAINT "Etudiant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recruteur" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "entrepriseId" INTEGER,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "poste" TEXT NOT NULL,

    CONSTRAINT "Recruteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entreprise" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Entreprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offre" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "salaire" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "localisation" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "rythme" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "recruteurId" INTEGER NOT NULL,

    CONSTRAINT "Offre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Universite" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Universite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favori" (
    "id" SERIAL NOT NULL,
    "etudiantId" INTEGER NOT NULL,
    "offreId" INTEGER NOT NULL,

    CONSTRAINT "Favori_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Etudiant_userId_key" ON "Etudiant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Recruteur_userId_key" ON "Recruteur"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favori_etudiantId_offreId_key" ON "Favori"("etudiantId", "offreId");

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_universiteId_fkey" FOREIGN KEY ("universiteId") REFERENCES "Universite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recruteur" ADD CONSTRAINT "Recruteur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recruteur" ADD CONSTRAINT "Recruteur_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offre" ADD CONSTRAINT "Offre_recruteurId_fkey" FOREIGN KEY ("recruteurId") REFERENCES "Recruteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "Etudiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_offreId_fkey" FOREIGN KEY ("offreId") REFERENCES "Offre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
