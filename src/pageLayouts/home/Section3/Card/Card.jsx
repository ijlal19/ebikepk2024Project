import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import css from './Card.module.scss'
export default function ImgCard({ img_url, title, location, price }) {
    return (<>
        <Card className={css.main} >
            <CardMedia
                component="img"
                alt="green iguana"
                height="230"
                image={img_url}
                style={{ cursor: 'pointer' }}
            />
            <CardContent>
                <Typography gutterBottom variant="p" style={{
                    fontSize: {
                        xs: '14px',
                        sm: '16px',
                        md: '20px',
                        lg: '20px'
                    },
                    fontFamily: 'sans-serif',
                    cursor: 'pointer',
                }} component="div">
                    <b>{title}</b>
                </Typography><br />
                <Typography variant="p" color="text.dark" className={css.price}>
                    {price}
                </Typography><br/><br />
                <Typography gutterBottom variant="p" style={{
                    fontSize: {
                        xs: '14px',
                        sm: '16px',
                        md: '20px',
                        lg: '20px'
                    },
                    fontFamily: 'sans-serif',
                    cursor: 'pointer',
                }} component="div">
                    <span style={{color:'grey'}}>{location}</span>
                </Typography>
            </CardContent>
        </Card>


    </>
    );
}
