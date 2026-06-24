"use client";

import { Suspense } from "react";
import AllArtworks from "./AllArtworksContent";



export default function AllArtworksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllArtworks/>
    </Suspense>
  );
}