'use client';
import { Box, Grid, useMediaQuery } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styles from './index.module.scss';
import Data from './Data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GetAllSetting } from '@/ebike-panel/ebike-panel-Function/globalfunction';

const OurVideos = ({ SetWidth, SetMaxWidth }: any) => {
  const [settingData, setSettingData] = useState<any[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    fetchBlogSetting();
  }, []);

  const fetchBlogSetting = async () => {
    setIsloading(true);
    const res = await GetAllSetting();

    if (res && res?.data) {
      const blogVideoSetting = res?.data?.find(
        (e: any) => e?.name === "blog_page_video"
      );

      let Data1: any[] = [];
      try {
        Data1 = blogVideoSetting?.value ? JSON.parse(blogVideoSetting.value) : [];
      } catch (err) {
        Data1 = [];
      }

      setSettingData(Array.isArray(Data1) ? Data1 : []);
      setIsloading(false);
    } else {
      setSettingData(Data);
      setIsloading(false);
    }
  };

  // ✅ fallback for first card (avoid undefined crash)
  const first = settingData?.[0] ?? Data?.[0];

  return (
    <Box className={styles.main} style={{ maxWidth: SetMaxWidth === 'inblogs' ? '1150px' : '1100px', display: isMobile ? SetMaxWidth === 'inblogs' ? 'block' : 'block' : 'block' }} >

      <Box className={styles.heading_box} style={{ display: SetMaxWidth === 'inblogs' ? 'none' : 'flex' }}>
        <Box>Browse Our Videos</Box>
        <Link href="https://www.youtube.com/@ebikepk" target='_blank' style={{ textDecoration: "none" }}>
          <Box className={styles.all_videos}>View all Videos</Box>
        </Link>
      </Box>

      <Grid container spacing={0.2} className={styles.container_} style={{ maxWidth: SetMaxWidth === 'inblogs' ? '1150px' : '1100px', rowGap: '.2px' }}>

        <Grid item xs={isMobile ? 12 : 7} style={isMobile ? {} : { paddingTop: "10px" }}  >
          <Link href={first?.video_url ?? "#"} className={styles.link} target='blank'>
            <Box
              className={styles.background_box}
              style={{
                backgroundImage: `url(${first?.thumbnail_url ?? ""})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'black',
                backgroundSize: "100% 100%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <PlayCircleIcon className={styles.icons} />
            </Box>
          </Link>
        </Grid>

        <Grid item xs={isMobile ? 12 : 5} style={{ paddingTop: isMobile ? '1px' : '10px' }}>
          <Grid container sx={{ display: isMobile ? "none" : "flex" }}>
            {settingData.slice(3, 4).map((e: any, i: any) => (
              <Grid item xs={isMobile ? 12 : 12} style={{ marginBottom: SetMaxWidth === 'inblogs' ? 1 : 1 }} key={i} className={styles.cards_grid}>
                <Link href={e.video_url} className={styles.cards_grid} target='blank'>
                  <Box
                    className={styles.card}
                    style={{
                      height: SetMaxWidth === 'inblogs' ? '29vh' : '25vh',
                      backgroundImage: `url(${e.thumbnail_url})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: "100% 100%",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'black',
                    }}
                  >
                    <PlayCircleIcon className={styles.icons} />
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={0.2}>
            {
              isMobile
                ? settingData.slice(1, 3).map((e: any, i: any) => (
                  <Grid item xs={6} style={{ marginBottom: SetMaxWidth === 'inblogs' ? 0 : 2 }} key={i} className={styles.cards_grid}>
                    <Link href={e.video_url} className={styles.cards_grid} target='blank'>
                      <Box
                        className={styles.card}
                        style={{
                          height: SetMaxWidth === 'inblogs' ? '27vh' : '25px',
                          backgroundImage: `url(${e.thumbnail_url})`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'black',
                        }}
                      >
                        <PlayCircleIcon className={styles.icons} />
                      </Box>
                    </Link>
                  </Grid>
                ))
                : settingData.slice(1, 3).map((e: any, i: any) => (
                  <Grid item xs={isMobile ? 12 : 6} style={{ marginBottom: SetMaxWidth === 'inblogs' ? 0 : 6 }} key={i} className={styles.cards_grid}>
                    <Link href={e.video_url} className={styles.cards_grid} target='blank'>
                      <Box
                        className={styles.card}
                        style={{
                          height: SetMaxWidth === 'inblogs' ? '27vh' : '25vh',
                          backgroundImage: `url(${e.thumbnail_url})`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'black',
                        }}
                      >
                        <PlayCircleIcon className={styles.icons} />
                      </Box>
                    </Link>
                  </Grid>
                ))
            }
          </Grid>

        </Grid>
      </Grid>
    </Box>
  );
};

export default OurVideos;


// 'use client';
// import { Box, Grid, useMediaQuery } from '@mui/material';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import styles from './index.module.scss';
// import Data from './Data';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { GetAllSetting } from '@/ebike-panel/ebike-panel-Function/globalfunction';

// const OurVideos = ({ SetWidth, SetMaxWidth }: any) => {
//     const [settingData, setSettingData] = useState<any>([]);
//     const [isLoading, setIsloading] = useState<boolean>(false);
//     const isMobile = useMediaQuery('(max-width: 768px)');

//     useEffect(() => {
//         fetchBlogSetting()
//     }, [])

//     const fetchBlogSetting = async () => {
//         setIsloading(true)
//         const res = await GetAllSetting()
//         if (res && res?.data) {
//             const blogVideoSetting = res?.data?.find(
//                 (e: any) => e?.name === "blog_page_video"
//             );
//             const Data1 = blogVideoSetting?.value ? JSON.parse(blogVideoSetting.value) : [];
//             console.log("test" , Data1[0])
//             setSettingData(Data1)
//             setIsloading(false)
//         }
//         else {
//             setSettingData(Data)
//             setIsloading(false)
//         }
//     }

//     return (
//         <Box className={styles.main} style={{ maxWidth: SetMaxWidth === 'inblogs' ? '1150px' : '1100px', display: isMobile ? SetMaxWidth === 'inblogs' ? 'block' : 'block' : 'block' }} >

//             <Box className={styles.heading_box} style={{ display: SetMaxWidth === 'inblogs' ? 'none' : 'flex' }}>
//                 <Box>Browse Our Videos</Box>
//                 <Link href="https://www.youtube.com/@ebikepk" target='_blank' style={{ textDecoration: "none" }}>
//                     <Box className={styles.all_videos}>View all Videos</Box>
//                 </Link>
//             </Box>

//             <Grid container spacing={0.2} className={styles.container_} style={{ maxWidth: SetMaxWidth === 'inblogs' ? '1150px' : '1100px', rowGap: '.2px' }}>

//                 <Grid item xs={isMobile ? 12 : 7} style={isMobile ? {} : { paddingTop: "10px" }}  >
//                     <Link href={settingData[0].video_url} className={styles.link} target='blank'>
//                         <Box
//                             className={styles.background_box}
//                             style={{
//                                 backgroundImage: `url(${settingData[0].thumbnail_url})`,
//                                 backgroundPosition: 'center',
//                                 backgroundRepeat: 'no-repeat',
//                                 backgroundColor: 'black',
//                                 backgroundSize: "100% 100%",
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                             }}>
//                             <PlayCircleIcon className={styles.icons} />
//                         </Box>
//                     </Link>
//                 </Grid>

//                 <Grid item xs={isMobile ? 12 : 5} style={{ paddingTop: isMobile ? '1px' : '10px' }}>
//                     <Grid container sx={{ display: isMobile ? "none" : "flex" }}>
//                         {settingData.slice(3, 4).map((e: any, i: any) => (
//                             <Grid item xs={isMobile ? 12 : 12} style={{ marginBottom: SetMaxWidth === 'inblogs' ? 1 : 1 }} key={i} className={styles.cards_grid}>
//                                 <Link href={e.video_url} className={styles.cards_grid} target='blank'>
//                                     <Box
//                                         className={styles.card}
//                                         style={{
//                                             height: SetMaxWidth === 'inblogs' ? '29vh' : '25vh',
//                                             backgroundImage: `url(${e.thumbnail_url})`,
//                                             backgroundPosition: 'center',
//                                             backgroundRepeat: 'no-repeat',
//                                             backgroundSize: "100% 100%",
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             backgroundColor: 'black',
//                                         }}
//                                     >
//                                         <PlayCircleIcon className={styles.icons} />
//                                     </Box>
//                                 </Link>
//                             </Grid>))}
//                     </Grid>
//                     <Grid container spacing={0.2}>
//                         {
//                             isMobile ?
//                                 settingData.slice(1, 3).map((e: any, i: any) => (
//                                     <Grid item xs={6} style={{ marginBottom: SetMaxWidth === 'inblogs' ? 0 : 2 }} key={i} className={styles.cards_grid}>
//                                         <Link href={e.video_url} className={styles.cards_grid} target='blank'>
//                                             <Box
//                                                 className={styles.card}
//                                                 style={{
//                                                     height: SetMaxWidth === 'inblogs' ? '27vh' : '25px',
//                                                     backgroundImage: `url(${e.thumbnail_url})`,
//                                                     backgroundPosition: 'center',
//                                                     backgroundRepeat: 'no-repeat',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                     backgroundColor: 'black',
//                                                 }}
//                                             >
//                                                 <PlayCircleIcon className={styles.icons} />
//                                             </Box>
//                                         </Link>
//                                     </Grid>
//                                 )) :
//                                 settingData.slice(1, 3).map((e: any, i: any) => (
//                                     <Grid item xs={isMobile ? 12 : 6} style={{ marginBottom: SetMaxWidth === 'inblogs' ? 0 : 6 }} key={i} className={styles.cards_grid}>
//                                         <Link href={e.video_url} className={styles.cards_grid} target='blank'>
//                                             <Box
//                                                 className={styles.card}
//                                                 style={{
//                                                     height: SetMaxWidth === 'inblogs' ? '27vh' : '25vh',
//                                                     backgroundImage: `url(${e.thumbnail_url})`,
//                                                     backgroundPosition: 'center',
//                                                     backgroundRepeat: 'no-repeat',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                     backgroundColor: 'black',
//                                                 }}
//                                             >
//                                                 <PlayCircleIcon className={styles.icons} />
//                                             </Box>
//                                         </Link>
//                                     </Grid>))
//                         }
//                     </Grid>

//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default OurVideos;


