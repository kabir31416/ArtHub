import CategorySection from "@/components/CategorySection";
import FeatureArts from "@/components/FeatureArts";
import HeroSlider from "@/components/HeroSlider";
import { Divide } from "lucide";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <CategorySection></CategorySection>
      <FeatureArts></FeatureArts>
    </div>
  );
}
