'use client'
import React, { useEffect, useState } from "react"
import styles from './index.module.scss'
import { getPageById } from "@/ebike-panel/ebike-panel-Function/globalfunction"
import Loader from "@/ebikeWeb/sharedComponents/loader/loader"
const TermsCondition = () => {
    const [Term_Description, setTermus_description] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        fecthAllPages()
    }, [])
    const fecthAllPages = async () => {
        setIsLoading(true)
        const res = await getPageById(25)
        if (res?.page?.html) {
            res.page.html = res?.page?.html.toString().replace('<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>', '')
        }
        setTermus_description(res?.page)
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    }
    return (
        <div>
            {
                !isLoading ?
                    <div className={styles.Term_main}>
                        <div className={styles.Termus}>
                            <h1 className={styles.abutus_heading}>{Term_Description?.title}</h1>
                            <div className={styles.Term_text}><div className={styles.blog_content} dangerouslySetInnerHTML={{ __html: Term_Description?.html }} ></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>}
        </div>
    )
}

export default TermsCondition;