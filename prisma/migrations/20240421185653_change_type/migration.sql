/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Size` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `price` on the `AdditionalServiceOption` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AdditionalServiceOption" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Size_value_key" ON "Size"("value");
