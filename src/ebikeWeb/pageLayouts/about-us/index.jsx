'use client'
import { getPageById } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
const AboutUs = () => {
    const [AboustUs_Description, setAboutus_description] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        fecthAllPages()
    }, [])
    const fecthAllPages = async () => {
        setIsLoading(true)
        const res = await getPageById(14)
        if (res?.page?.html) {
            res.page.html = res?.page?.html.toString().replace('<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>', '')
        }
        setAboutus_description(res?.page)
        setIsLoading(false)
        setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    }

    return (
        <>
            {
                !isLoading ?
                    <Box className={styles.about_main}>
                        <Box className={styles.aboutus}>
                            <h1 className={styles.abutus_heading}>{AboustUs_Description?.title}</h1>
                            <Box className={styles.about_text}><div className={styles.blog_content} dangerouslySetInnerHTML={{ __html: AboustUs_Description?.html }} ></div>
                            </Box>
                        </Box>
                    </Box>
                    :
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>}
        </>
    )
}
export default AboutUs