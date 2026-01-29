import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import ProductSection from "./homepage/product";
import FullWidthSlider from "./homepage/slider";
import ArticleSection from "./homepage/article";
import VideoSection from "./homepage/video";
import Achievement from "./homepage/achieve";
import AchievementSection from "./homepage/achieve";

export default function Home() {
  return (
    <ClientLayout>
      <div>
        <FullWidthSlider />
        <div className="bg-gradient-dark-blue">
          <AchievementSection />
        </div>
        <VideoSection />
        <ProductSection />
        <ArticleSection />
      </div>
    </ClientLayout>

  );
}
