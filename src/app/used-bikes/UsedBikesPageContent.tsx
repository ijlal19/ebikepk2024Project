import AllUsedBikeComp from "@/ebikeWeb/pageLayouts/all-used-bikes/index";

type UsedBikesPageContentProps = {
  allUsedBike: any;
  jsonLd: Record<string, any>;
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
  allUsedBike,
  jsonLd,
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
      <AllUsedBikeComp
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
