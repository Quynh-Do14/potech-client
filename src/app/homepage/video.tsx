"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/assets/styles/pages/home/video.module.css'
import videoService from '@/infrastructure/repository/video/video.service'
import { VideoInterface } from '@/infrastructure/interface/video/video.interface'
import YouTubeThumbnail from '@/infrastructure/common/thumbnailYoutube/thumbnailYoutube'
import YoutubeVideo from '@/infrastructure/common/thumbnailYoutube/youtube'
import { Modal } from 'antd'
import dynamic from 'next/dynamic'
import { PageLoading } from '@/infrastructure/common/loading/loadingPage'
import { ConfigPageInterface } from '@/infrastructure/interface/configPage/configPage.interface'
import { getYoutubeId } from '@/infrastructure/helper/helper'
type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const VideoContent = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const configContent = configPage.find(item => item.type == type);

    const [listVideo, setListVideo] = useState<Array<VideoInterface>>([]);
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [isOpenModalVideo, setIsOpenModalVide] = useState<boolean>(false);
    const onGetListVideoAsync = async () => {
        const param = {
            limit: 4,
        }
        try {
            await videoService.GetVideo(
                param,
                () => { }
            ).then((res) => {
                setListVideo(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListVideoAsync().then(_ => { });
    }, []);

    const onOpenModalVideo = (item: VideoInterface, videoId: string) => {
        setSelectedVideo(videoId);
        setIsOpenModalVide(true);
    };

    return (
        <section className={styles.videoSection}>
            <div className={styles.container}>
                {/* Header với logo và thông tin */}
                <div className="section-header">
                    {
                        configContent?.box_content
                            ?
                            <div className="section-badge">
                                <span className="badge-text"> {configContent?.box_content} </span>
                            </div>
                            :
                            null
                    }
                    {
                        configContent?.title
                            ?
                            <h2 className="section-title">
                                <article
                                    dangerouslySetInnerHTML={{ __html: configContent?.title }}
                                />
                            </h2>
                            :
                            null
                    }
                    {
                        configContent?.description
                            ?
                            <p className="section-subtitle-white">
                                {configContent?.description}
                            </p>
                            :
                            null
                    }
                </div>

                <div className={styles.videoContent}>
                    {
                        listVideo.map((item, index) => {
                            const videoId = getYoutubeId(item.link_url)
                            return (
                                <div onClick={() => onOpenModalVideo(item, videoId || "")} className={styles.mainVideo} key={index}>
                                    <div className={styles.testimonialVideoContainer}>
                                        <div className={styles.testimonialVideo}>
                                            <YouTubeThumbnail name={item.name} url={item.link_url} />
                                            <div className={styles.smallPlayButton}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M8 5V19L19 12L8 5Z" fill="#ff8c00" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.testimonialVideoContent}>
                                        <h3 className={`${styles.testimonialTitle} text-truncate-2`}>
                                            {item.name}
                                        </h3>

                                        <p className={`${styles.testimonialQuote} text-truncate-3`}>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="gold-corner-tl"></div>
                                    <div className="gold-corner-tr"></div>
                                    <div className="gold-corner-bl"></div>
                                    <div className="gold-corner-br"></div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <Modal
                key={"f-0"}
                open={isOpenModalVideo}
                width={"90%"}
                closable={true}
                onCancel={() => setIsOpenModalVide(false)}
                footer={null}
                centered
                destroyOnHidden
            >
                <YoutubeVideo
                    videoId={selectedVideo}
                />
            </Modal>
        </section>
    )
}


const VideoSection = dynamic(() => Promise.resolve(VideoContent), {
    ssr: false,
    loading: () => <PageLoading />
});

export default VideoSection;