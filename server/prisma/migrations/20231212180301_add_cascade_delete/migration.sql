-- DropForeignKey
ALTER TABLE "Orase" DROP CONSTRAINT "Orase_id_tara_fkey";

-- DropForeignKey
ALTER TABLE "Temperaturi" DROP CONSTRAINT "Temperaturi_id_oras_fkey";

-- AddForeignKey
ALTER TABLE "Orase" ADD CONSTRAINT "Orase_id_tara_fkey" FOREIGN KEY ("id_tara") REFERENCES "Tari"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temperaturi" ADD CONSTRAINT "Temperaturi_id_oras_fkey" FOREIGN KEY ("id_oras") REFERENCES "Orase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
