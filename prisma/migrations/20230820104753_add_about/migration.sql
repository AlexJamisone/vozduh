-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);
