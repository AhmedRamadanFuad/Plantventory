"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const session = await auth();
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      plants: true,
    },
  });
  return user;
}

export async function getPlants() {
  const session = await auth();
  if (!session?.user?.email) return null;
  const user = await prisma.plant.findMany();
  return user;
}

export async function getPlantById(id: string) {
  const plant = await prisma.plant.findUnique({
    where: { id },
  });
  return plant;
}
type Plant = {
  name: string;
  description: string;
  stock: number;
  price: number;
  category: string;
  userId: string;
  imageUrl: string;
};
// create plants
export async function createPlant(data: Plant) {
  "use server";
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;
    if (!currentUserId) return;

    const newPlant = await prisma.plant.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
    return newPlant;
  } catch (error) {
    console.error("Error Creating Plant:", error);
    throw error;
  }
}

export async function editPlant(
  id: string, //identify which plant we are editing
  data: Plant
) {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;
    const updatedPlant = await prisma.plant.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
  } catch (error) {
    console.error("Error updating plant:", error);
    throw error;
  }
}

export async function deletePlant(
  id: string //identify which plant we are editing
) {
  const session = await auth();
  const currentUserId = session?.user?.id;
  if (!currentUserId) return;

  const deletedPlant = await prisma.plant.delete({
    where: { id },
  });
  revalidatePath("/plants");
  return deletedPlant;
}
