'use client';

import { isLoginUser } from '@/genericFunctions/geneFunc';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

export const BLOG_TAGS = [
  'Honda',
  'Price',
  'Bike',
  'Tips',
  'CC',
  'Suzuki',
  '125',
  '2025',
  'Petrol',
  'New',
  'Used',
  'Riding',
  'Fuel',
  'KTM',
  'Pakistan',
  'Launch',
  'Model',
  'Yamaha',
  'Review',
  'Vehicle',
  'Kawasaki',
  'Motorcycle',
  'Electric',
  'Introduce',
  'Scooter',
  'BMW',
];

type BlogSidebarSectionProps = {
  selectedTag?: string;
  onTagClick?: (tag: string) => void;
  onSellBikeClick?: () => void;
};

const FACEBOOK_PAGE_URL = 'https://web.facebook.com/ebike.pk';
const EBIKE_LOGO_URL = 'https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png';

const BlogSidebarSection = ({
  selectedTag = '',
  onTagClick,
  onSellBikeClick,
}: BlogSidebarSectionProps) => {
  const router = useRouter();

  const handleSellBike = () => {
    if (onSellBikeClick) {
      onSellBikeClick();
      return;
    }

    const loginInfo = isLoginUser();
    if (!loginInfo?.login) {
      alert('Please Login to Sell Your Bike!');
      return;
    }

    router.push('/used-bikes/sell-used-bike');
  };

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
      return;
    }

    router.push(`/blog?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <Box className={styles.sidebarSection}>
      <button className={styles.sellButton} onClick={handleSellBike}>Sell Your Bike</button>

      <Box className={styles.facebookCard}>
        <Box className={styles.facebookTop}>
          <img src={EBIKE_LOGO_URL} alt="ebike.pk" className={styles.logo} />
          <Box className={styles.pageInfo}>
            <Typography className={styles.pageTitle}>ebike.pk</Typography>
            <Typography className={styles.pageSubtitle}>Join our official Facebook page</Typography>
          </Box>
        </Box>

        <Box className={styles.facebookBottom}>
          <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer" className={styles.followLink}>
            <FacebookIcon sx={{ fontSize: 18 }} />
            Follow Page
          </a>
        </Box>
      </Box>

      <Box className={styles.tagsMain}>
        <Typography className={styles.shortblogheading}>
          Popular Tags <span className={styles.underline}></span>
        </Typography>

        <Box className={styles.tagsContent}>
          {BLOG_TAGS.map((tag) => (
            <Button
              key={tag}
              className={selectedTag !== tag ? styles.tagsBtn : styles.tagsSelectBtn}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogSidebarSection;
