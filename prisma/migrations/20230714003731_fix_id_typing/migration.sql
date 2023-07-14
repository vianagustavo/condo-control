/*
  Warnings:

  - The primary key for the `lotes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `lotes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `unit_id` on the `boletos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "boletos" DROP CONSTRAINT "boletos_unit_id_fkey";

-- AlterTable
ALTER TABLE "boletos" DROP COLUMN "unit_id",
ADD COLUMN     "unit_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lotes" DROP CONSTRAINT "lotes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "lotes_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "boletos" ADD CONSTRAINT "boletos_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
