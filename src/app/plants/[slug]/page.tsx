import { Metadata } from "next";
import React from "react";
import PlantCard from "./PlantCard";
import { SignIn } from "@/components/AuthButtons";
import { getPlantById } from "@/actions/plant.aciton";
import { auth } from "@/lib/auth";

type SlugPageProps = {
  params: { slug: string };
};

// ✅ Metadata function لازم تاخد نفس PageProps
export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  return {
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plant details page",
  };
}

// ✅ لازم اسمها Page مش page
export default async function Page({ params }: SlugPageProps) {
  const session = await auth();
  const user = session?.user;
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard plant={plant} />
      </div>
    </div>
  );
}
