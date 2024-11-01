"use client"
import React, {useState} from "react"
import styles from './index.module.scss'
import { BrandArr, CityArr, YearArr, CcArr } from '@/constants/globalData'
import { useRouter } from 'next/navigation'

const SellUsedBike = () => {
   
    const [isLoading, setIsLoading] = useState(false)
    const Router = useRouter()

    return (
        <div>

        </div>
    )
}

export default SellUsedBike;
