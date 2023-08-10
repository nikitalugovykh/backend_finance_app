-- AlterTable
ALTER TABLE "UserProfiles" ADD COLUMN     "profileId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
