import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './index.module.scss'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'

export default function ImgCard(props:any) {

    const router = useRouter()
    
    let imgUrl = ''
    if(props.data.img_url) {
        imgUrl = props.data.img_url
    }
    else if(props.data.images && props.data?.images?.length > 0) {
        imgUrl = props.data?.images[0]
    }

    function goToDetailPage(val:any) {
        if(val.currentpage == 'new_bike'){
            let title = val.data.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            // console.log('url title', urlTitle,title)
            router.push(`/new-bikes/a/${urlTitle}/${val.data.id}`)
        }
        else if(val.currentpage == 'featured_bike'){
            let title = val.data.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            console.log('url title', urlTitle,title)
            // router.push(`/used-bikes/${urlTitle}/${val.id}`)
        }
        else if(val.currentpage == 'trending_bike'){
            let title = val.data.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            console.log('url title', urlTitle,title)
            // router.push(`/used-bikes/${urlTitle}/${val.id}`)
        }
        else if(val.currentpage == 'used_bike'){
            let title = val.data.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            console.log('url title', urlTitle,title)
            router.push(`/used-bikes/${urlTitle}/${val.data.id}`)
        }
        else{
            console.log('not found')
        }
    }

    return (<>
        <Card className={styles.itemCard} >
            <CardMedia
                component="img"
                alt={props.data.title}
                height="230"
                image={imgUrl}
                className={styles.card_img}
            />

            <CardContent className={styles.card_info}>
                <Typography className={styles.card_title} >
                    {props.data.title}
                </Typography>
                
                <Typography className={styles.card_price}>
                    {props.data.price} {props.from == 'n' ? '' : '' }
                </Typography>

                { props.from == "u" ? 
                    <Typography className={styles.card_location}>
                        {props.data.location}
                    </Typography>
                    :
                    <>
                    {/* <Typography className={styles.avg_price_text}>
                        Avg. Ex-Showroom price
                    </Typography> */}
                    </>
                }
                 <Button className={styles.view_detail_btn} onClick={()=>{ goToDetailPage(props) }} > View Detail </Button>
            </CardContent>
        </Card>

    </>
    );
}
