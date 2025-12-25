-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Reflection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dateRange" TEXT NOT NULL,
    "monthGroup" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reflection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevokedToken" (
    "id" TEXT NOT NULL,
    "jti" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RevokedToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalEntry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT DEFAULT 'General',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalFile" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonalFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reflection_slug_key" ON "Reflection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RevokedToken_jti_key" ON "RevokedToken"("jti");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalFile_filename_key" ON "PersonalFile"("filename");

-- AddForeignKey
ALTER TABLE "PersonalFile" ADD CONSTRAINT "PersonalFile_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "PersonalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
