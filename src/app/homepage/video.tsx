"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/assets/styles/pages/home/video.module.css'
import videoService from '@/infrastructure/repository/video/video.service'
import { VideoInterface } from '@/infrastructure/interface/video/video.interface'
import YouTubeThumbnail from '@/infrastructure/common/thumbnailYoutube/thumbnailYoutube'
import YoutubeVideo from '@/infrastructure/common/thumbnailYoutube/youtube'
import { Modal } from 'antd'
const VideoSection = () => {
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
        console.log('vao');

    };

    return (
        <section className={styles.videoSection}>
            <div className={styles.container}>
                {/* Header với logo và thông tin */}
                <div className="section-header">
                    <div className="article-badge">
                        <span className="badge-text">VIDEO GIỚI THIỆU</span>
                    </div>
                    <h2 className="article-title">
                        Trải Nghiệm <span className="highlight">Sản Phẩm </span>  Qua Video
                    </h2>
                    <p className="article-subtitle">
                        Khám phá sản phẩm của chúng tôi qua những video chất lượng cao,
                        mang đến cái nhìn chân thực và đầy đủ nhất
                    </p>
                </div>

                <div className={styles.videoContent}>
                    {
                        listVideo.map((item, index) => {
                            const videoId = item.link_url.split('v=')[1];
                            return (
                                <div onClick={() => onOpenModalVideo(item, videoId)} className={styles.mainVideo} key={index}>
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
                                    <h3 className={`${styles.testimonialTitle} text-truncate-2`}>
                                        {item.name}
                                    </h3>

                                    <p className={`${styles.testimonialQuote} text-truncate-3`}>
                                        {item.description}
                                    </p>
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
                destroyOnClose
            >
                <YoutubeVideo
                    videoId={selectedVideo}
                />
            </Modal>
        </section>
    )
}

export default VideoSection 