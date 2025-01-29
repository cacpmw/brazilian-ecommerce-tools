"use client";
import { useState, ChangeEvent } from "react";

export default function Converter() {
  const [image, setImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg" | "webp" | "avif">("png");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!image) return;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Convert to the selected format
        const convertedDataUrl = canvas.toDataURL(`image/${format}`);
        setConvertedImage(convertedDataUrl);
      }
    };
  };

  return (
    <div className="flex flex-col w-1/3 justify-center gap-y-2">
      <div className="flex justify-center">
        <h1>Conversor de Imagens</h1>
      </div>
      <div className="flex flex-col">
        <input
          className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_format"
        >
          Selecione o formato
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="file_format"
          value={format}
          onChange={(e) =>
            setFormat(e.target.value as "png" | "jpeg" | "webp" | "avif")
          }
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
          <option value="avif">AVIF</option>
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleConvert}
      >
        Converter
      </button>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-2">
            {image && (
              <div className="flex flex-col">
                <h2>Original</h2>
                <img src={image} alt="Upload" style={{ maxWidth: "300px" }} />
              </div>
            )}
            {convertedImage && (
              <div className="flex flex-col">
                <h2>Imagem Convertida</h2>
                <img
                  src={convertedImage}
                  alt="Converted"
                  style={{ maxWidth: "300px" }}
                />
                <a
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  href={convertedImage}
                  download={`converted-image.${format}`}
                >
                  Baixar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
