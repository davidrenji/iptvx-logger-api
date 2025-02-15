/*
  Warnings:

  - Added the required column `deviceId` to the `Logger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logger" ADD COLUMN     "deviceId" VARCHAR(255) NOT NULL;
