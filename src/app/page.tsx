import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import ProductSection from "./homepage/product";
import FullWidthSlider from "./homepage/slider";
import ArticleSection from "./homepage/article";

export default function Home() {
  return (
    <ClientLayout>
      <div>
        <FullWidthSlider />
        <ProductSection />
        <ArticleSection />
      </div>
    </ClientLayout>

  );
}
