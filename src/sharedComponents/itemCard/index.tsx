import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './index.module.scss'

export default function ImgCard(props:any) {
    return (<>
        <Card className={styles.itemCard} >
            <CardMedia
                component="img"
                alt="green iguana"
                height="230"
                image={props.data.img_url}
                className={styles.card_img}
            />

            <CardContent>
                <Typography className={styles.card_title} >
                    {props.data.title}
                </Typography>
                
                <Typography className={styles.card_price}>
                    {props.data.price}
                </Typography>

                <Typography className={styles.card_location}>
                    {props.data.location}
                </Typography>
            </CardContent>
        </Card>

    </>
    );
}
