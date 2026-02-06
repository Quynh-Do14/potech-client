'use client'
import React, { useState, useCallback, memo, useRef, useEffect } from 'react'
import Slider, { Settings } from 'react-slick';
import styles from '@/assets/styles/pages/product/galleryProduct.module.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { configImageURL } from '@/infrastructure/helper/helper';
import Image from 'next/image';

const SlideItem = memo(({ slide, isActive, onClick }: { slide: string, isActive: boolean, onClick: () => void }) => {
    return (
        <div
            className={`${styles.slideItem} ${isActive ? styles.activeSlide : ''}`}
            onClick={onClick}
            aria-current={isActive ? "true" : "false"}
        >
            <div className={styles.slideInner}>
                <Image
                    src={configImageURL(slide)}
                    alt="Product thumbnail"
                    fill
                    className={styles.thumbnailImage}
                    sizes="100px"
                    quality={75}
                />
                {isActive && <div className={styles.activeOverlay} />}
            </div>
        </div>
    );
});

SlideItem.displayName = 'SlideItem';

type Props = {
    slides: string[];
};

const GalleryComponent = (props: Props) => {
    const { slides } = props;
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [mainImage, setMainImage] = useState<string>(slides[0] || '');
    const mainImageRef = useRef<HTMLDivElement>(null);
    const thumbnailSliderRef = useRef<Slider>(null);
    const galleryContainerRef = useRef<HTMLDivElement>(null);

    const handleBeforeChange = useCallback((oldIndex: number, newIndex: number) => {
        setCurrentSlide(newIndex);
        setMainImage(slides[newIndex]);
    }, [slides]);

    const handleThumbnailClick = useCallback((index: number) => {
        event?.preventDefault();
        setCurrentSlide(index);
        setMainImage(slides[index]);
        if (thumbnailSliderRef.current) {
            thumbnailSliderRef.current.slickGoTo(index);
        }
    }, [slides]);

    const handlePrev = useCallback(() => {
        event?.preventDefault();
        const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        setCurrentSlide(newIndex);
        setMainImage(slides[newIndex]);
        if (thumbnailSliderRef.current) {
            thumbnailSliderRef.current.slickGoTo(newIndex);
        }
    }, [currentSlide, slides]);

    const handleNext = useCallback(() => {
        event?.preventDefault();
        const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        setCurrentSlide(newIndex);
        setMainImage(slides[newIndex]);
        if (thumbnailSliderRef.current) {
            thumbnailSliderRef.current.slickGoTo(newIndex);
        }
    }, [currentSlide, slides]);

    useEffect(() => {
        // Ngăn slick slider gây scroll
        const slickSlides = document.querySelectorAll('.slick-slide');
        slickSlides.forEach(slide => {
            slide.addEventListener('click', (e) => e.preventDefault());
        });

        return () => {
            slickSlides.forEach(slide => {
                slide.removeEventListener('click', (e) => e.preventDefault());
            });
        };
    }, []);

    const settings: Settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: Math.min(5, slides.length),
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        focusOnSelect: false,
        beforeChange: handleBeforeChange,
        swipeToSlide: true,
        touchThreshold: 10,
        variableWidth: false, // Đặt false để sử dụng fixed width
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: Math.min(4, slides.length),
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: Math.min(3, slides.length),
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(3, slides.length),
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(3, slides.length),
                    centerMode: false,
                }
            }
        ]
    };

    return (
        <div className={styles.galleryContainer} ref={galleryContainerRef}>
            {/* Main Image Section */}
            <div className={`${styles.mainImageContainer}`}>
                <div
                    className={styles.mainImageWrapper}
                    ref={mainImageRef}
                    tabIndex={-1}
                >
                    <div className={styles.imageContainer}>
                        <Image
                            src={configImageURL(mainImage)}
                            alt="Main product image"
                            fill
                            className={styles.mainImage}
                            priority
                            quality={90}
                        />
                    </div>

                    {/* Navigation Buttons */}
                    {
                        slides.length > 1
                        &&
                        <button
                            className={`${styles.navButton} ${styles.prevButton}`}
                            onClick={handlePrev}
                            aria-label="Previous image"
                            type="button"
                        >
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        </button>
                    }
                    {
                        slides.length > 1
                        &&
                        <button
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={handleNext}
                            aria-label="Next image"
                            type="button"
                        >
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </button>
                    }
                    {/* Slide Counter */}
                    {
                        slides.length > 1
                        &&
                        <div className={styles.slideCounter}>
                            <span className={styles.currentNumber}>{currentSlide + 1}</span>
                            <span className={styles.slash}>/</span>
                            <span className={styles.totalNumber}>{slides.length}</span>
                        </div>
                    }
                </div>
            </div>

            {/* Thumbnail Slider */}
            {
                slides.length > 1
                &&
                <div className={styles.thumbnailSliderContainer}>
                    <div className={styles.sliderWrapper}>
                        <Slider {...settings} ref={thumbnailSliderRef}>
                            {slides.map((slide, index) => (
                                <div key={index} className={styles.slideWrapper}>
                                    <SlideItem
                                        slide={slide}
                                        isActive={currentSlide === index}
                                        onClick={() => handleThumbnailClick(index)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            }

        </div>
    )
}

export default memo(GalleryComponent);