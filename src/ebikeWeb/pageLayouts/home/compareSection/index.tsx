'use client'

import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SpeedIcon from '@mui/icons-material/Speed';
import Link from 'next/link';
import styles from './index.module.scss';

function CompareSection() {
  return (
    <section className={styles.compareSection}>
      <div className={styles.compareContainer}>
        <div className={styles.copy}>
          <span className={styles.kicker}>
            <CompareArrowsIcon />
            Bike Comparison
          </span>
          <h2>Compare New Bikes Side by Side</h2>
          <p>
            Select two bikes and check price, specs, engine, mileage, features, and electric bike details in one place.
          </p>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.bikeCard}>
            <DirectionsBikeIcon />
            <span>Bike 1</span>
          </div>
          <div className={styles.compareBadge}>
            <CompareArrowsIcon />
          </div>
          <div className={styles.bikeCard}>
            <SpeedIcon />
            <span>Bike 2</span>
          </div>
        </div>

        <Link href="/new-bikes/compare" className={styles.compareButton}>
          Compare Bikes
        </Link>
      </div>
    </section>
  )
}

export default CompareSection
