/*
  Warnings:

  - Added the required column `value` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "paymentDate" DATETIME,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_expenses" ("createdAt", "description", "dueDate", "id", "paymentDate", "status", "title", "type", "updatedAt", "userId") SELECT "createdAt", "description", "dueDate", "id", "paymentDate", "status", "title", "type", "updatedAt", "userId" FROM "expenses";
DROP TABLE "expenses";
ALTER TABLE "new_expenses" RENAME TO "expenses";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
