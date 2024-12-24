/*
  Warnings:

  - You are about to drop the column `basePrice` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `soldTicketQuantity` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `totalTicketQuantity` on the `Evento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "basePrice",
DROP COLUMN "soldTicketQuantity",
DROP COLUMN "totalTicketQuantity";
