/*
  Warnings:

  - You are about to drop the `Point` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `point` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "point" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Point";
