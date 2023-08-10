/*
  Warnings:

  - You are about to drop the column `profileId` on the `UserProfiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserProfiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfiles" DROP CONSTRAINT "UserProfiles_profileId_fkey";

-- DropForeignKey
ALTER TABLE "UserProfiles" DROP CONSTRAINT "UserProfiles_userId_fkey";

-- AlterTable
ALTER TABLE "UserProfiles" DROP COLUMN "profileId",
DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
