import './Section3.css'
// import { FaCircleChevronRight } from "react-icons/fa6";
import ImgCard from './Card/Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Container } from '@mui/material';
import Data from './Data';
function Section3() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <>
            <Box className='Section4_main'>
                <Container>
                    <Carousel responsive={responsive} className='carousel'>
                        {
                        Data.map((e,i)=>{
                            return(
                                <div key={i} className='cards_div'>
                                    <ImgCard  img_url={e.img_url} title={e.title} price={e.price} location={e.location}/>
                                </div>
                            )
                        })
                        }
                    </Carousel>;
                </Container>
            </Box>
        </>
    )
}
export default Section3