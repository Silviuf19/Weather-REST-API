/*
  Warnings:

  - You are about to drop the `Food` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Food";

-- CreateTable
CREATE TABLE "Tari" (
    "id" SERIAL NOT NULL,
    "nume_tara" TEXT NOT NULL,
    "latitudine" DOUBLE PRECISION NOT NULL,
    "longitudine" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tari_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orase" (
    "id" SERIAL NOT NULL,
    "id_tara" INTEGER NOT NULL,
    "nume_oras" TEXT NOT NULL,
    "latitudine" DOUBLE PRECISION NOT NULL,
    "longitudine" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Orase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Temperaturi" (
    "id" SERIAL NOT NULL,
    "valoare" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_oras" INTEGER NOT NULL,

    CONSTRAINT "Temperaturi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tari_nume_tara_key" ON "Tari"("nume_tara");

-- CreateIndex
CREATE UNIQUE INDEX "Orase_id_tara_nume_oras_key" ON "Orase"("id_tara", "nume_oras");

-- CreateIndex
CREATE UNIQUE INDEX "Temperaturi_id_oras_timestamp_key" ON "Temperaturi"("id_oras", "timestamp");

-- AddForeignKey
ALTER TABLE "Orase" ADD CONSTRAINT "Orase_id_tara_fkey" FOREIGN KEY ("id_tara") REFERENCES "Tari"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temperaturi" ADD CONSTRAINT "Temperaturi_id_oras_fkey" FOREIGN KEY ("id_oras") REFERENCES "Orase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
