import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import '../../../app/globals.scss'
import { Box, Typography, Avatar, Grid, Rating } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import styles from './index.module.scss';

const reviews = [
  {
    "id": 537,
    "comment": "Zabardast bike hai, comfort aur mileage dono achay hain. Long route pe bhi maza aata hai.",
    "bikeId": 225,
    "rating": 5,
    "uid": "user-001",
    "createdAt": "2022-07-01T10:15:30.000Z",
    "updatedAt": "2022-07-01T10:15:30.000Z",
    "user": { "userFullName": "Ali Khan" }
  },
  {
    "id": 538,
    "comment": "Average performance hai, engine ka sound thora zyada hai.",
    "bikeId": 225,
    "rating": 3,
    "uid": "user-002",
    "createdAt": "2022-07-05T08:30:00.000Z",
    "updatedAt": "2022-07-05T08:30:00.000Z",
    "user": { "userFullName": "Junaid Mehmood" }
  },
  {
    "id": 539,
    "comment": "Suspension itni achi nahi, lekin fuel average theek hai.",
    "bikeId": 225,
    "rating": 3,
    "uid": "user-003",
    "createdAt": "2022-07-07T14:20:45.000Z",
    "updatedAt": "2022-07-07T14:20:45.000Z",
    "user": { "userFullName": "Hamza Yousaf" }
  },
  {
    "id": 540,
    "comment": "Yeh bike sirf shehr ke liye theek hai, highways pe unstable feel hoti hai.",
    "bikeId": 225,
    "rating": 2,
    "uid": "user-004",
    "createdAt": "2022-07-09T18:00:00.000Z",
    "updatedAt": "2022-07-09T18:00:00.000Z",
    "user": { "userFullName": "Bilal Tariq" }
  },
  {
    "id": 541,
    "comment": "Mujhe design aur shape bohat pasand aayi, ride smooth hai.",
    "bikeId": 225,
    "rating": 4,
    "uid": "user-005",
    "createdAt": "2022-07-11T11:11:11.000Z",
    "updatedAt": "2022-07-11T11:11:11.000Z",
    "user": { "userFullName": "Sana Ullah" }
  },
  {
    "id": 542,
    "comment": "Bhai maintenance kaafi zyada hai is bike ki, har waqt kuch na kuch kharab hota hai.",
    "bikeId": 225,
    "rating": 2,
    "uid": "user-006",
    "createdAt": "2022-07-13T09:25:00.000Z",
    "updatedAt": "2022-07-13T09:25:00.000Z",
    "user": { "userFullName": "Nabeel" }
  },
  {
    "id": 543,
    "comment": "Price k hisab se achhi bike hai, resale value bhi kaafi strong hai.",
    "bikeId": 225,
    "rating": 4,
    "uid": "user-007",
    "createdAt": "2022-07-15T16:45:30.000Z",
    "updatedAt": "2022-07-15T16:45:30.000Z",
    "user": { "userFullName": "Fahad Saleem" }
  },
  {
    "id": 544,
    "comment": "Mileage kaafi behtareen hai, lekin engine heat zyada karta hai.",
    "bikeId": 225,
    "rating": 3,
    "uid": "user-008",
    "createdAt": "2022-07-17T07:00:00.000Z",
    "updatedAt": "2022-07-17T07:00:00.000Z",
    "user": { "userFullName": "Imran Shah" }
  }
];



export default function ReviewSwiper() {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Latest Reviews</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        // spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // centeredSlides={true}
        breakpoints={{
          1: {
            slidesPerView: 1,
            spaceBetween: 15,
            freeMode: {
              enabled: true,
              sticky: false,
            },
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
        }}
        simulateTouch={true}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <Box
              sx={{
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: 2,
                marginLeft:"auto",
                marginRight:"auto",
                marginBottom:4,
                width:300,
                backgroundColor: '#f9f9f9',
                height: "auto"
              }}
            >
              <Grid container spacing={3} className={styles.grid_main}>
                <Grid item className={styles.grid_item} >
                  <Avatar className={styles.avatar} >
                    <PersonIcon className={styles.icon}/>
                  </Avatar>
                  <Typography className={styles.user_name} >{review.user.userFullName}</Typography>
                  <Rating
                    value={review.rating}
                    precision={1}
                    readOnly
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarIcon fontSize="inherit" />}
                    className={styles.rating}
                  />
                  <Typography className={styles.date}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography className={styles.comment_text}>
                    {review.comment}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
