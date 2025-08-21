import React from "react";
import PlantCard from "./PlantCard";
import { SignIn } from "@/components/AuthButtons";
import { getPlantById } from "@/actions/plant.aciton";
import { auth } from "@/lib/auth";
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const user = session?.user;
  const [id] = slug.split("--");
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
