import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import ProductSection from "./homepage/product";
import FullWidthSlider from "./homepage/slider";
import ArticleSection from "./homepage/article";
import VideoSection from "./homepage/video";
import AchievementSection from "./homepage/achieve";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";
import { Endpoint } from "@/core/common/apiLink";
import { Suspense } from "react";
import { PageLoading } from "@/infrastructure/common/loading/loadingPage";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const HomePageContent = async () => {
  const config = await fetch(`${baseURL}${Endpoint.ConfigPage.Get}`, {
    cache: 'no-store', // Tắt cache
  }).then((res) => res.json());
  const configPage: ConfigPageInterface[] = config.data

  return (
    <div>
      <FullWidthSlider />
      <div className="bg-gradient-dark">
        <AchievementSection
          configPage={configPage}
          type={"SECTION_1"}
        />
      </div>
      <ProductSection
        configPage={configPage}
        type={"SECTION_2"} />
      <div className="bg-gradient-dark">
        <VideoSection
          configPage={configPage}
          type={"SECTION_3"} />

      </div>
      <ArticleSection
        configPage={configPage}
        type={"SECTION_4"}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ClientLayout>
      <Suspense fallback={<PageLoading />}>
        <HomePageContent />
      </Suspense>
    </ClientLayout>
  );
}