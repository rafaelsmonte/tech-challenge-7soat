/*
  Warnings:

  - Made the column `paymentId` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "paymentId" SET NOT NULL;
