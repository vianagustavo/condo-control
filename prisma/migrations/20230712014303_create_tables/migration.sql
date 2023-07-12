-- CreateTable
CREATE TABLE "lotes" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boletos" (
    "id" UUID NOT NULL,
    "drawee_name" VARCHAR(255) NOT NULL,
    "unit_id" UUID NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "digitable_line" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "boletos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boletos" ADD CONSTRAINT "boletos_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
