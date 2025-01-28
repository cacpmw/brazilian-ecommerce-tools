"use client";

import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Ean() {
  const notify = () => toast("Copiado para a área de transferência.");

  const [ean, setEan] = useState("");

  function generateEAN() {
    let ean = "";
    for (let i = 0; i < 12; i++) {
      ean += Math.floor(Math.random() * 10).toString();
    }

    const checkDigit = calculateCheckDigit(ean);
    ean += checkDigit;
    return ean;
  }

  function calculateCheckDigit(ean: string) {
    let sum = 0;
    for (let i = 0; i < ean.length; i++) {
      const digit = parseInt(ean[i], 10);
      if (i % 2 === 0) {
        sum += digit;
      } else {
        sum += digit * 3;
      }
    }

    const mod = sum % 10;
    return mod === 0 ? 0 : 10 - mod;
  }

  function handleCreateEan() {
    const newEan = generateEAN();
    setEan(newEan);
    navigator.clipboard.writeText(newEan);
    notify();
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-y-2">
      <p>EAN: {ean}</p>
      <div className="flex flex-row gap-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleCreateEan}
        >
          Novo Codigo
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
