import AllUsedBikeComp from "@/ebikeWeb/pageLayouts/all-used-bikes/index";
import SeoContentBlock from "@/app/components/SeoContentBlock";

type UsedBikesPageContentProps = {
  allFeaturedBike: any;
  allUsedBike: any;
  jsonLd: Record<string, any>;
  seoTags: string[];
  pageTitle: string;
  pageDescription: string;
  listingHeading: string;
  listingSubheading: string;
  seoHeading: string;
  seoIntro: string;
  seoSections: Array<{ heading: string; body: string }>;
  seoLinks: Array<{ label: string; href: string }>;
  hideSidebar?: boolean;
  hidePriceTable?: boolean;
};

export default function UsedBikesPageContent({
  allFeaturedBike,
  allUsedBike,
  jsonLd,
  seoTags,
  pageTitle,
  pageDescription,
  listingHeading,
  listingSubheading,
  seoHeading,
  seoIntro,
  seoSections,
  seoLinks,
  hideSidebar = false,
  hidePriceTable = false,
}: UsedBikesPageContentProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoContentBlock
        title={pageTitle}
        description={pageDescription}
        tags={seoTags}
        headingLevel="h1"
      />
      <AllUsedBikeComp
        _allFeaturedBike={allFeaturedBike}
        _allUsedBike={allUsedBike}
        pageHeading={listingHeading}
        pageSubheading={listingSubheading}
        seoHeading={seoHeading}
        seoIntro={seoIntro}
        seoSections={seoSections}
        seoLinks={seoLinks}
        hideSidebar={hideSidebar}
        hidePriceTable={hidePriceTable}
      />
    </>
  );
}
