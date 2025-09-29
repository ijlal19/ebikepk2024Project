import React from 'react';
import styles from './index.module.scss';
import { Link, useMediaQuery } from '@mui/material';
import { add3Dots, cloudinaryLoader, optimizeImage, priceWithCommas, timeAgo } from '@/genericFunctions/geneFunc';

const NewCard = ({ props }: any) => {
    const isMobile = useMediaQuery('(max-width:768px)')
    const getBlogUrl = (blogInfo: any) => {
        let title = blogInfo.blogTitle.replace(/\s+/g, '-').toLowerCase();
        return `/blog/${blogInfo.blog_category.name.toLowerCase()}/${title}/${blogInfo.id}`;
    };
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.image_box}
                >
                    <img src={cloudinaryLoader(props?.featuredImage?.split(' #$# ')[0]?.trim(), 400, 'auto')} alt={props?.blogTitle} className={styles.image} />
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{add3Dots(props?.blogTitle, isMobile ? 25 : 60)}</p>
                    <p className={styles.author}>By <span className={styles.name}>{props?.authorname}</span></p>
                    <p className={styles.description}>{add3Dots(props?.meta_description, isMobile ? 40 : 80)}</p>
                    <Link href={getBlogUrl(props)} className={styles.link}>
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}

const NewMoreBlogCard = ({ props }: any) => {
    const isMobile = useMediaQuery('(max-width:768px)')
    const getBlogUrl = (blogInfo: any) => {
        let title = blogInfo.blogTitle.replace(/\s+/g, '-').toLowerCase();
        return `/blog/${blogInfo.blog_category.name.toLowerCase()}/${title}/${blogInfo.id}`;
    };

    return (
        <Link href={getBlogUrl(props)} className={styles.main}>
            <div className={styles.container}>
                <div className={styles.image_box}
                >
                    <img src={cloudinaryLoader(props?.featuredImage?.split(' #$# ')[0]?.trim(), 400, 'auto')} alt={props?.blogTitle} className={styles.image} />
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{add3Dots(props?.blogTitle, isMobile ? 13 : 40)}</p>
                    <p className={styles.authorblog}><span>By <span className={styles.name}>{props?.authorname}</span></span> <span>{timeAgo(props?.createdAt)}</span></p>
                </div>
            </div>
        </Link>
    )
}

const NewBikeCard = ({ props }: any) => {
    const isMobile = useMediaQuery('(max-width:768px)')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.image_boxnewbike}>
                    <img src={cloudinaryLoader(props?.img_url, 400, 'auto')} alt={props?.title} className={styles.image} />
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{add3Dots(props?.title, isMobile ? 13 : 28)}</p>
                    <p className={styles.price}><span className={styles.name}>{props?.price}</span></p>
                    {/* <Link href={getBlogUrl(props)} className={styles.link}> */}
                    <Link href={props?.url} className={styles.linkbtn}>
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}

const UsedBikeCard = ({ props }: any) => {
    const isMobile = useMediaQuery('(max-width:768px)')
    const GetImageSrc = (image: any) => {
        if (image && image.length > 0) {
            return image[0]
        }
        else {
            return "https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png"
        }
    }
    const GetHref = (val: any) => {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        return `/used-bikes/${urlTitle}/${val.id}`
    }
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.image_boxusedbike}>
                    <img src={cloudinaryLoader(GetImageSrc(props?.images), 400, 'auto')}
                        alt={props?.title || "default bike"}
                        className={styles.image}
                    />
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{add3Dots(props?.title, isMobile ? 12 : 28)}</p>
                    <p className={styles.price}><span className={styles.name}>PKR {priceWithCommas(props?.price)}</span></p>
                    {/* <Link href={getBlogUrl(props)} className={styles.link}> */}
                    <Link href={GetHref(props)} className={styles.linkbtn}>
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}

const NewVideoCard = ({ props }: any) => {
    const isMobile = useMediaQuery('(max-width:768px)')
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.image_box}
                >
                    <img src={cloudinaryLoader(props?.thumbnail_url, 400, 'auto')} alt={props?.title} className={styles.image} />
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{add3Dots(props?.title, isMobile ? 25 : 60)}</p>
                    <p className={styles.author}>By <span className={styles.name}>Ebike Team</span></p>
                    <Link href={props?.video_url} target="_blank" className={styles.link1}>
                        Watch Video
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Dealers_Cards = ({ props }: any) => {
function goToDetailPage(bike: any) {
        var shop_name = bike.shop_name;
        shop_name = shop_name.replace(/\s+/g, '-');
        var lowerTitle = shop_name.toLowerCase();
        return `/dealers/${lowerTitle}/${bike.id}`
    }
    return (
        <div className={styles.main_dealer}>
            <div className={styles.container}>
                <img src={cloudinaryLoader(props.bike_brand.logoUrl , 400 , 'auto')} alt="" className={styles.image} />
                <div className={styles.content}>
                    <p className={styles.name}>{props.shop_name}</p>
                    <p className={styles.location}>Dealer in {props.city.city_name}</p>
                    <Link href={goToDetailPage(props)} target="_blank" className={styles.linkbtn}>
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Mechainc_Cards = ({ props }: any) => {
   function goToDetailPage(bike: any) {
        var shop_name = bike.shop_name;
        shop_name = shop_name.replace(/\s+/g, '-');
        var lowerTitle = shop_name.toLowerCase();
        return `/mechanics/${lowerTitle}/${bike.id}`
    }
    return (
        <div className={styles.main_dealer}>
            <div className={styles.container}>
                <img src={cloudinaryLoader(props.bike_brand.logoUrl , 400 , 'auto')} alt="" className={styles.image} />
                <div className={styles.content}>
                    <p className={styles.name}>{props.shop_name}</p>
                    <p className={styles.location}>Mechanic in {props.city.city_name}</p>
                    <Link href={goToDetailPage(props)} target="_blank" className={styles.linkbtn}>
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}

export { NewCard, NewBikeCard, NewVideoCard, UsedBikeCard, NewMoreBlogCard, Dealers_Cards , Mechainc_Cards }