-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EMPLOYER', 'JOB_SEKER');

-- CreateEnum
CREATE TYPE "ADMIN_TYPE" AS ENUM ('SUPER_ADMIN', 'AGENCY_ADMIN', 'SUB_ADMIN');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "db-ms-auth-accounts" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "db-ms-auth-accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db-ms-auth-admins" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "type" "ADMIN_TYPE" NOT NULL,
    "accountId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "db-ms-auth-admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db-ms-auth-agencies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "db-ms-auth-agencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "db-ms-auth-accounts_email_key" ON "db-ms-auth-accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "db-ms-auth-admins_accountId_key" ON "db-ms-auth-admins"("accountId");

-- AddForeignKey
ALTER TABLE "db-ms-auth-accounts" ADD CONSTRAINT "db-ms-auth-accounts_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "db-ms-auth-agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db-ms-auth-admins" ADD CONSTRAINT "db-ms-auth-admins_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "db-ms-auth-accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
