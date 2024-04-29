/*
  Warnings:

  - You are about to drop the column `totalSum` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `ProductPriceHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[path]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductPriceHistory" DROP CONSTRAINT "ProductPriceHistory_productId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalSum",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductPriceHistory";

-- CreateIndex
CREATE UNIQUE INDEX "Category_path_key" ON "Category"("path");
