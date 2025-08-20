-- DropForeignKey
ALTER TABLE "public"."Plant" DROP CONSTRAINT "Plant_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Plant" ADD CONSTRAINT "Plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
