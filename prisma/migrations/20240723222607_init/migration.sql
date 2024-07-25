/*
  Warnings:

  - Added the required column `paymentId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentId" VARCHAR(50) NOT NULL;
