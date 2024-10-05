import BannerSection from './bannerSection/index'
import FeatureSection from './featureSection/index'
import NewBikesSection from './newbikesSection/index'
import BrandSection from './brandSection/index'
import Explore from './exploresection/index'
// import BlogSection from './blogSection/index'
import UsedBikesSection from './usedbikeSection/index'
import TrendingBikesSection from './treandingSection/index'
import Loader from '@/sharedComponents/loader/loader'

const Index = () => {
  return (
    <>
     <BannerSection />
     <NewBikesSection/>
     <FeatureSection />
     <UsedBikesSection/>
     <TrendingBikesSection/>
     <BrandSection/>
     <Explore/>
     {/* <BlogSection/> */}
     {/* <Loader/> */}
    </>
  )
}

export default Index