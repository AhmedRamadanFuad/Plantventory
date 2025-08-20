import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { createPlant } from "@/actions/plant.aciton";
import toast from "react-hot-toast";
// import ImageUpload from "./ImageUpload";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import ImageUpload from "./ImageUpload";
// import { UploadButton } from "@/lib/upload-thing";

export default function CreateDialog() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 1,
    price: 1,
    category: "",
    userId: "",
    imageUrl: "",
  });
  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = () => {
    createPlant(formData);
    toast.success("Plant Created Successfully");
  };
  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     try {
  //       const newPlant = await createPlant(formData);
  //       console.log("plant created: ", newPlant);
  //       toast.success("Plant created successfully");
  //     } catch (error) {
  //       console.error("error creating plant", error);
  //       toast.error("Failed to create plant");
  //     }
  //   };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto font-bold flex items-center gap-2"
          asChild
        >
          <span>
            <Sprout className="w-4 h-4" />
            Add Plant
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a Plant</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new plant to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Type your message here."
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          {/*Image Upload*/}
          <ImageUpload formData={formData} handleChange={handleChange} />
          {/* <div>
            <label>Plant Image</label>
            {formData.imageUrl && (
              <Image
                src={formData.imageUrl}
                alt="Plant Preview"
                className="w-full mb-4 rounded-md max-h-48 object-cover"
                width={300}
                height={100}
              />
            )}
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0].ufsUrl) {
                  handleChange("imageUrl", res[0].ufsUrl);
                }
              }}
              onUploadError={(error: Error) =>
                console.error("upload error", error)
              }
            />
          </div> */}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
