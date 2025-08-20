"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { getPlants } from "@/actions/plant.aciton";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Plants = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
  plants: Plants;
}
// const myPlants = [
//   {
//     id: "cl001",
//     name: "Aloe Vera",
//     description: "A medicinal plant known for its soothing gel.",
//     category: "Indoor",
//     stock: 15,
//     price: 25.5,
//     createdAt: "2025-08-18T12:00:00Z",
//     updatedAt: "2025-08-18T12:00:00Z",
//     imageUrl: "https://picsum.photos/200?1",
//     userId: "user001",
//   },
//   {
//     id: "cl002",
//     name: "Snake Plant",
//     description: "Low-maintenance plant that purifies air.",
//     category: "Indoor",
//     stock: 30,
//     price: 18.0,
//     createdAt: "2025-08-18T12:05:00Z",
//     updatedAt: "2025-08-18T12:05:00Z",
//     imageUrl: "https://picsum.photos/200?2",
//     userId: "user001",
//   },
//   {
//     id: "cl003",
//     name: "Spider Plant",
//     description: "Popular hanging plant with arching leaves.",
//     category: "Indoor",
//     stock: 22,
//     price: 12.5,
//     createdAt: "2025-08-18T12:10:00Z",
//     updatedAt: "2025-08-18T12:10:00Z",
//     imageUrl: "https://picsum.photos/200?3",
//     userId: "user002",
//   },
//   {
//     id: "cl004",
//     name: "Peace Lily",
//     description: "Flowering plant that thrives in low light.",
//     category: "Indoor",
//     stock: 18,
//     price: 20.0,
//     createdAt: "2025-08-18T12:15:00Z",
//     updatedAt: "2025-08-18T12:15:00Z",
//     imageUrl: "https://picsum.photos/200?4",
//     userId: "user002",
//   },
//   {
//     id: "cl005",
//     name: "Monstera Deliciosa",
//     description: "Large-leaf tropical plant with natural splits.",
//     category: "Indoor",
//     stock: 12,
//     price: 45.0,
//     createdAt: "2025-08-18T12:20:00Z",
//     updatedAt: "2025-08-18T12:20:00Z",
//     imageUrl: "https://picsum.photos/200?5",
//     userId: "user003",
//   },
//   {
//     id: "cl006",
//     name: "Bamboo Palm",
//     description: "Elegant palm suitable for offices.",
//     category: "Indoor",
//     stock: 10,
//     price: 35.0,
//     createdAt: "2025-08-18T12:25:00Z",
//     updatedAt: "2025-08-18T12:25:00Z",
//     imageUrl: "https://picsum.photos/200?6",
//     userId: "user003",
//   },
//   {
//     id: "cl007",
//     name: "Rubber Plant",
//     description: "Glossy large leaves, great indoor decor.",
//     category: "Indoor",
//     stock: 16,
//     price: 28.0,
//     createdAt: "2025-08-18T12:30:00Z",
//     updatedAt: "2025-08-18T12:30:00Z",
//     imageUrl: "https://picsum.photos/200?7",
//     userId: "user004",
//   },
//   {
//     id: "cl008",
//     name: "Cactus",
//     description: "Desert plant that requires minimal watering.",
//     category: "Outdoor",
//     stock: 40,
//     price: 10.0,
//     createdAt: "2025-08-18T12:35:00Z",
//     updatedAt: "2025-08-18T12:35:00Z",
//     imageUrl: "https://picsum.photos/200?8",
//     userId: "user004",
//   },
//   {
//     id: "cl009",
//     name: "Jade Plant",
//     description: "Succulent often called the money plant.",
//     category: "Indoor",
//     stock: 25,
//     price: 22.0,
//     createdAt: "2025-08-18T12:40:00Z",
//     updatedAt: "2025-08-18T12:40:00Z",
//     imageUrl: "https://picsum.photos/200?9",
//     userId: "user005",
//   },
//   {
//     id: "cl010",
//     name: "Fiddle Leaf Fig",
//     description: "Trendy indoor plant with large leaves.",
//     category: "Indoor",
//     stock: 8,
//     price: 50.0,
//     createdAt: "2025-08-18T12:45:00Z",
//     updatedAt: "2025-08-18T12:45:00Z",
//     imageUrl: "https://picsum.photos/200?10",
//     userId: "user005",
//   },
//   {
//     id: "cl011",
//     name: "Lavender",
//     description: "Aromatic herb with purple flowers.",
//     category: "Outdoor",
//     stock: 35,
//     price: 15.0,
//     createdAt: "2025-08-18T12:50:00Z",
//     updatedAt: "2025-08-18T12:50:00Z",
//     imageUrl: "https://picsum.photos/200?11",
//     userId: "user006",
//   },
//   {
//     id: "cl012",
//     name: "Rose",
//     description: "Classic flowering plant available in many colors.",
//     category: "Outdoor",
//     stock: 50,
//     price: 12.0,
//     createdAt: "2025-08-18T12:55:00Z",
//     updatedAt: "2025-08-18T12:55:00Z",
//     imageUrl: "https://picsum.photos/200?12",
//     userId: "user006",
//   },
//   {
//     id: "cl013",
//     name: "Tulip",
//     description: "Spring-blooming flower available in various colors.",
//     category: "Outdoor",
//     stock: 60,
//     price: 8.0,
//     createdAt: "2025-08-18T13:00:00Z",
//     updatedAt: "2025-08-18T13:00:00Z",
//     imageUrl: "https://picsum.photos/200?13",
//     userId: "user007",
//   },
//   {
//     id: "cl014",
//     name: "Orchid",
//     description: "Exotic flowering plant with delicate blooms.",
//     category: "Indoor",
//     stock: 14,
//     price: 30.0,
//     createdAt: "2025-08-18T13:05:00Z",
//     updatedAt: "2025-08-18T13:05:00Z",
//     imageUrl: "https://picsum.photos/200?14",
//     userId: "user007",
//   },
//   {
//     id: "cl015",
//     name: "Basil",
//     description: "Herb used in cooking, easy to grow indoors.",
//     category: "Herbs",
//     stock: 45,
//     price: 5.0,
//     createdAt: "2025-08-18T13:10:00Z",
//     updatedAt: "2025-08-18T13:10:00Z",
//     imageUrl: "https://picsum.photos/200?15",
//     userId: "user008",
//   },
//   {
//     id: "cl016",
//     name: "Mint",
//     description: "Refreshing herb often used in drinks.",
//     category: "Herbs",
//     stock: 55,
//     price: 6.0,
//     createdAt: "2025-08-18T13:15:00Z",
//     updatedAt: "2025-08-18T13:15:00Z",
//     imageUrl: "https://picsum.photos/200?16",
//     userId: "user008",
//   },
//   {
//     id: "cl017",
//     name: "Thyme",
//     description: "Hardy herb used in Mediterranean cooking.",
//     category: "Herbs",
//     stock: 28,
//     price: 7.0,
//     createdAt: "2025-08-18T13:20:00Z",
//     updatedAt: "2025-08-18T13:20:00Z",
//     imageUrl: "https://picsum.photos/200?17",
//     userId: "user009",
//   },
//   {
//     id: "cl018",
//     name: "Fern",
//     description: "Lush green plant, loves humidity.",
//     category: "Indoor",
//     stock: 20,
//     price: 14.0,
//     createdAt: "2025-08-18T13:25:00Z",
//     updatedAt: "2025-08-18T13:25:00Z",
//     imageUrl: "https://picsum.photos/200?18",
//     userId: "user009",
//   },
//   {
//     id: "cl019",
//     name: "Palm Tree",
//     description: "Tropical plant suitable for outdoor gardens.",
//     category: "Outdoor",
//     stock: 6,
//     price: 80.0,
//     createdAt: "2025-08-18T13:30:00Z",
//     updatedAt: "2025-08-18T13:30:00Z",
//     imageUrl: "https://picsum.photos/200?19",
//     userId: "user010",
//   },
//   {
//     id: "cl020",
//     name: "Pothos",
//     description: "Fast-growing vine, perfect for hanging baskets.",
//     category: "Indoor",
//     stock: 33,
//     price: 16.0,
//     createdAt: "2025-08-18T13:35:00Z",
//     updatedAt: "2025-08-18T13:35:00Z",
//     imageUrl: "https://picsum.photos/200?20",
//     userId: "user010",
//   },
// ];
export default function InventoryTable({ plants }: InventoryTableProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter plants by name and category (if selected)
  const filteredPlants = plants?.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  if (!plants) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="w-full h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Filter plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
        <CreateDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlants?.map((plant) => {
            const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-");
            const slug = `${plant.id}--${slugifiedName}`;
            const plantUrl = `/plants/${slug}`;
            return (
              <TableRow key={plant.id} onClick={() => router.push(plantUrl)}>
                <TableCell>{plant.id}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>${plant.price}</TableCell>
                <TableCell className="font-bol">{plant.stock}</TableCell>
                <TableCell className="text-right">
                  <div
                    className="flex justify-end max-md:space-x-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditDialog plant={plant} />
                    <DeleteDialog plant={plant} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
