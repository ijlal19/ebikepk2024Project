"use client"
import { Inter } from "next/font/google";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import 'swiper/css';

const inter = Inter({ subsets: ["latin"] });

export default function UsedBike() {
  return (
    <main className={`${styles.main_container} used_bike_detail_pg`}>
      <div className={styles.container_one}>
        
        <h1>Honda cb 125F 2023</h1>
       
        <Swiper spaceBetween={50} slidesPerView={1} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)} modules={[Navigation, Pagination]}>
          <SwiperSlide>
            <img src="https://picsum.photos/300/200?random=1" alt="Random Image 1" style={{ width: "100%" }}/>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://picsum.photos/300/200?random=2" alt="Random Image 2" style={{ width: "100%" }} />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://picsum.photos/300/200?random=3" alt="Random Image 3" style={{ width: "100%" }} />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://picsum.photos/300/200?random=4" alt="Random Image 4" style={{ width: "100%" }} />
          </SwiperSlide>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
  

        <table width="100%" className={styles.info_content}>
            <tbody>
              <tr>
                <td><p>2023</p></td>
                <td><p>4,900 km</p></td>
                <td><p>4 Stroke</p></td>
              </tr>
            </tbody>
        </table> 

        <table width="100%" className={styles.info_content}>
            <tbody>
              <tr>
                <td>Register in</td>
                <td>Punjab</td>
                <td>Last update:</td>
                <td>Aug 28, 2024</td>
              </tr>
              <tr>
                <td>Body Type</td>
                <td>Standard</td>
                <td>Ad ref #</td>
                <td>585746</td>
              </tr>
            </tbody>
          </table>

              <h2>Bike Features</h2>
                <div className={styles.feature_class}>
                {/* <h2>Bike Features</h2> */}
                  <span>Anti theft lock</span>
                  <span>Disc brake</span>
                  <span>led light</span>
                  <p>Wind sheild</p>
                  </div>
                  <div className={styles.seller_comments}>
                  <h3>Sellers Comments</h3>
                  <p>Honda CB 125F 2023 model Total genion.</p>
                  <p>Mention PakWheels.com when calling Seller to get a good deal</p>
                  </div>
                {/* </div> */}
      </div>
     
    <div>
    <div className={styles.container_two}>
      <h2 className={styles.price_tect} >PKR 3.35 lacs</h2>
      <hr/>
      <div className={styles.button}>
        <span>1234564</span>
        <small className="block">show phone number</small>
      </div>
      <div className={styles.send_message}>Send message</div>
    </div>
    <div className={styles.container_three}>
        <div className={styles.owner_detail_head}>
          <h1>Seller Detals</h1>
          <div className={styles.owner_name}>
          <small>Ahmed</small>
          <small>Member Since Mar 05, 2020</small>
          <div className={styles.icons}>
            <span className={styles.contact} ></span>
            <span className={styles.message}></span>
            <span className={styles.facebook}></span>
          </div>
          <p>See if your friends know this seller</p>
          <span>Connect with facebook</span>
          </div>
        </div>
      </div>
      <div className={styles.container_four}>
        <div className={styles.transaction}>
          <h1>Safety tips for transaction</h1>
          <ol>
            <li>Use a safe location to meet seller</li>
            <li>Avoid cash transactions</li>
            <li>Beware of unrealistic offers</li>
            <p>Learn More</p>
          </ol>
        </div>
      </div>
      <div className={styles.container_five}>
      <div className={styles.notify}>Notify As Sold</div>
      <div className={styles.report}>Report this Ad</div>
      </div>
      </div>
    </main>
  );
}