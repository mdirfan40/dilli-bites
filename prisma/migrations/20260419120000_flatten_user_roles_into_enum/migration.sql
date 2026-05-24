PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL CHECK ("userType" IN ('ADMIN', 'DELIVERY_AGENT', 'RESTAURANT_OWNER')),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "new_User" (
    "id",
    "name",
    "email",
    "password",
    "userType",
    "isActive",
    "createdAt",
    "updatedAt"
)
SELECT
    "id",
    "name",
    "email",
    "password",
    "userType",
    "isActive",
    "createdAt",
    "updatedAt"
FROM "User";

DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "new_DeliveryAgent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "vehicleType" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING' CHECK ("verificationStatus" IN ('PENDING', 'APPROVED', 'REJECTED')),
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DeliveryAgent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "new_DeliveryAgent" (
    "id",
    "userId",
    "phone",
    "vehicleType",
    "isAvailable",
    "verificationStatus",
    "createdAt",
    "updatedAt"
)
SELECT
    "id",
    "userId",
    "phone",
    "vehicleType",
    "isAvailable",
    'PENDING',
    "createdAt",
    "updatedAt"
FROM "DeliveryAgent";

DROP TABLE "DeliveryAgent";
ALTER TABLE "new_DeliveryAgent" RENAME TO "DeliveryAgent";
CREATE UNIQUE INDEX "DeliveryAgent_userId_key" ON "DeliveryAgent"("userId");

CREATE TABLE "new_RestaurantOwner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING' CHECK ("verificationStatus" IN ('PENDING', 'APPROVED', 'REJECTED')),
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RestaurantOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "new_RestaurantOwner" (
    "id",
    "userId",
    "restaurantName",
    "phone",
    "address",
    "verificationStatus",
    "createdAt",
    "updatedAt"
)
SELECT
    "id",
    "userId",
    "restaurantName",
    "phone",
    "address",
    'PENDING',
    "createdAt",
    "updatedAt"
FROM "RestaurantOwner";

DROP TABLE "RestaurantOwner";
ALTER TABLE "new_RestaurantOwner" RENAME TO "RestaurantOwner";
CREATE UNIQUE INDEX "RestaurantOwner_userId_key" ON "RestaurantOwner"("userId");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;