-- CreateTable
CREATE TABLE "Logger" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
);
