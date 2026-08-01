import Banner from "@/components/home/Banner";
import FeaturedEbooks from "@/components/home/FeaturedEbooks";
import FeaturedEbooksSkeleton from "@/components/home/src/components/skeletons/FeaturedEbooksSkeleton";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Suspense } from "react";

export default function Home() {
  return (

    <div>
      <Navbar />
      <Banner />
      <Suspense fallback={<FeaturedEbooksSkeleton />}>
        <FeaturedEbooks />
      </Suspense>
      <Footer />

    </div>

  );
}
