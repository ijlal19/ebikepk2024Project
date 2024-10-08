import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './index.module.scss'
import { Button } from '@mui/material';

export default function ImgCard(props:any) {
    return (<>
        <Card className={styles.itemCard} >
            <CardMedia
                component="img"
                alt={props.data.title}
                height="230"
                image={props.data.img_url}
                className={styles.card_img}
            />

            <CardContent className={styles.card_info}>
                <Typography className={styles.card_title} >
                    {props.data.title}
                </Typography>
                
                <Typography className={styles.card_price}>
                    {props.data.price} {props.from == 'n' ? 'Onwards' : '' }
                </Typography>

                { props.from == "u" ? 
                    <Typography className={styles.card_location}>
                        {props.data.location}
                    </Typography> 
                    :
                    <>
                     <Typography className={styles.avg_price_text}>
                        Avg. Ex-Showroom price
                     </Typography>
                    </>
                }
                 <Button className={styles.view_detail_btn} > View Bike Detail </Button>
            </CardContent>
        </Card>

    </>
    );
}
