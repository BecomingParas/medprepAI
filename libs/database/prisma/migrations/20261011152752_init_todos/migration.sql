-- CreateTable
CREATE TABLE "Todo" (
    "id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Todo_completed_createdAt_idx" ON "Todo"("completed", "createdAt");
