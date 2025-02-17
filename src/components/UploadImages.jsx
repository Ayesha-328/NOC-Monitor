import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { Button } from "@radix-ui/themes";

const UploadImages = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);

        if (images.length + files.length > 8) {
            alert("You can upload a maximum of 8 images.");
            return;
        }

        const imagePreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prevImages) => [...prevImages, ...imagePreviews]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            const removedImage = updatedImages.splice(index, 1)[0];

            // Revoke the object URL for the removed image to free up memory
            URL.revokeObjectURL(removedImage.preview);

            return updatedImages;
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="flex justify-between">
                <div>
                    <h3>Upload Images (Maximum 8)</h3>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={images.length >= 8}
                    />
                    {images.length >= 8 && (
                        <p className="text-red-500 text-sm">You have reached the maximum limit of 8 images.</p>
                    )}
                </div>
                <Button className="cursor-pointer" disabled={images.length === 0}>Upload</Button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            position: "relative",
                            margin: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={image.preview}
                            alt={`Preview ${index}`}
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                            }}
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute text-red-500 top-0 right-0 text-xl"
                        >
                            <MdCancel />
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default UploadImages;
