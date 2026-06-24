"use client";

import { Suspense } from "react";
import AllArtworksContent from "./AllArtworksContent";

export default function AllArtworksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllArtworksContent />
    </Suspense>
  );
}