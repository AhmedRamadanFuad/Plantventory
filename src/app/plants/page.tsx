import { getPlants, getUsers } from "@/actions/plant.aciton";
import { SignOut } from "@/components/AuthButtons";
import InventoryTable from "@/components/InventoryTable";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function page() {
  const session = await auth();

  const plants = await getPlants();
  console.log(plants);

  return (
    <>
      {session ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable plants={plants} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignOut />
        </div>
      )}
    </>
  );
}

export default page;
