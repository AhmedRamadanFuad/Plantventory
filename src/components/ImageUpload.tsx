import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";

export interface ImageUploadFormData {
  imageUrl: string;
  name?: string;
  description?: string;
  stock?: number;
  price?: number;
  category?: string;
  userId?: string;
}
export interface ImageUploadProps {
  formData: ImageUploadFormData;
  handleChange: (
    field: keyof ImageUploadFormData,
    value: string | number
  ) => void;
}

function ImageUpload({ formData, handleChange }: ImageUploadProps) {
  return (
    <div>
      <label>Plant Image</label>
      {formData.imageUrl && (
        <Image
          src={formData.imageUrl}
          alt="Plant Preview"
          className="w-full mb-4 mt-2 rounded-md max-h-48 object-cover"
          width={300}
          height={100}
        />
      )}
      {/* <Button variant={"outline"}> */}
      <UploadButton
        className="custom-class"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0].ufsUrl) {
            handleChange("imageUrl", res[0].ufsUrl);
          }
        }}
        onUploadError={(error: Error) => console.error("upload error", error)}
      />
      {/* </Button> */}
    </div>
  );
}

export default ImageUpload;
