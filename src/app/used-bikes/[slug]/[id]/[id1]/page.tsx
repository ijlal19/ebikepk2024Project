import * as React from 'react';
import AllUsedBikeFilter from "@/ebikeWeb/pageLayouts/all-used-bikes-by-filter/index"
import { Metadata } from 'next'
import { getSinglebikesDetail, getCityFromId , getBrandFromId} from "@/ebikeWeb/functions/globalFuntions"
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData"

type Props = {
  params: { id: string, slug: string, id1:string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug, id1 } = params

  let from = slug
  let title = ""
  let description = ""

  if(from?.indexOf('year') > -1) {  
    let year = id 
    title = 'Used Bikes ' + year + ' Model for Sale in Pakistan |ebike.pk';
    description = 'Used bikes ' + year + ' Model for sale in Pakistan. Get complete used bikes ' + year +' Model details with pics and video on Pakistans Ist Exclusive motorcycle portal ebike.pk'
  }
  else if(from?.indexOf('used-bike') > -1 && from?.indexOf('city') > -1) {
    let city = getCityFromId(id1, CityArr)
    const cityName = city && city?.length > 0 ?  city[0].city_name : ""
    title = 'Used Bikes & Motorcycles for Sale in ' + cityName + ' | ebike.pk'
    description = 'Used bikes & motorcycles for sale in ' + cityName + ' find wide range of honda used bikes and yamaha motorcycles for sale in Karachi pakistan.'
  }
  else if(from?.indexOf('cc') > -1) {
      let cc = id
      title = 'Used Bikes ' + cc +'cc'+ ' for Sale in Pakistan |ebike.pk';
    description ='Used bikes '+ cc + 'cc' + ' for sale in Pakistan. Get complete '+ cc + "cc" + ' used bikes details with pics and video on Pakistans Ist Exclusive motorcycle portal ebike.pk'
  }
  else if(from?.indexOf('city') > -1 && from?.indexOf('brand') > -1) {
    let city = getCityFromId(id1, CityArr)
    const cityName = city && city?.length > 0 ?  city[0].city_name : ""
    title = 'Used Bikes & Motorcycles for Sale in ' + cityName + ' | ebike.pk'
    description = 'Used bikes & motorcycles for sale in ' + cityName + ' find wide range of honda used bikes and yamaha motorcycles for sale in Karachi pakistan.'
  }
  else if(from?.indexOf('city') > -1) {
      let city = getCityFromId(id1, CityArr)
      const cityName = city && city?.length > 0 ?  city[0].city_name : ""
      title = 'Used Bikes & Motorcycles for Sale in ' + cityName + ' | ebike.pk'
      description = 'Used bikes & motorcycles for sale in ' + cityName + ' find wide range of honda used bikes and yamaha motorcycles for sale in Karachi pakistan.'
  }
  else if(from?.indexOf('brand') > -1) {
    let brand = id
    title = brand?.charAt(0)?.toUpperCase() + brand?.slice(1) + ' Used Motorcycles in Pakistan  | ebike.pk'
    description = brand + ' Used Motorcycles for sale in Pakistan. Find best ' + brand + ' used motorcycles of your choice according to your needs on ebike.pk.'
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
    },
  }
}

export default function UsedBike() {
    return (  
      <AllUsedBikeFilter />
    )
}