import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './index.module.scss'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'
import { priceWithCommas } from '@/ebikeWeb/functions/globalFuntions'

export default function ImgCard(props:any) {

    const Router = useRouter()
    
    let imgUrl = ''
    if(props.data.img_url) {
        imgUrl = props.data.img_url
    }
    else if(props.data.images && props.data?.images?.length > 0) {
        imgUrl = props.data?.images[0]
    }

    function goToDetailPage(bike:any) {
        
        if(props.currentpage == 'new_bike') {
            Router.push(`/new-bikes/${bike?.bike_brand?.brandName}/${bike?.bikeUrl}/${bike.id}`)
        }
        else if(props.currentpage == 'featured_bike') {
            Router.push(bike?.url)
        }
        else if(props.currentpage == 'trending_bike') {
            Router.push(bike?.url)
        }
        else if(props.currentpage == 'used_bike') {
            let title = bike?.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            Router.push(`/used-bikes/${urlTitle}/${bike?.id}`)
        }
        else {
            console.log('not found')
        }
    }

    let bike = props.data

    return (<>
        <Card className={styles.itemCard} >
            <CardMedia
                component="img"
                alt={bike.title}
                height="230"
                image={imgUrl}
                className={`${styles.card_img} ${props.from == "n" ? styles.card_img_dynamic_height: ""}`}
            />

            <CardContent className={styles.card_info}>
                <Typography className={styles.card_title} >
                    {bike.title }
                </Typography>
                
                <Typography className={styles.card_price}>
                    {priceWithCommas(bike.price)}
                </Typography>

                { props.from == "u" ? 
                    <Typography className={styles.card_location}>
                        {bike.location}
                    </Typography>
                    : ""
                }
                 <Button className={styles.view_detail_btn} onClick={()=>{ goToDetailPage(bike) }} > View Detail </Button>
            </CardContent>
        </Card>
    </>
    );
}