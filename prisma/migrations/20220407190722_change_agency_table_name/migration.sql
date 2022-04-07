/*
  Warnings:

  - You are about to drop the `Agency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "db-ms-auth-accounts" DROP CONSTRAINT "db-ms-auth-accounts_agencyId_fkey";

-- DropTable
DROP TABLE "Agency";

-- CreateTable
CREATE TABLE "db-ms-auth-agency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "db-ms-auth-agency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "db-ms-auth-accounts" ADD CONSTRAINT "db-ms-auth-accounts_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "db-ms-auth-agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
