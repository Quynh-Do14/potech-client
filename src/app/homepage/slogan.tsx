'use client'
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/assets/styles/pages/home/slogan.css";
import categoryProductService from "@/infrastructure/repository/category/categoryProduct.service";
import { configImageURL } from "@/infrastructure/helper/helper";

const SloganSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        fade: false, // Đổi từ true thành false để có transition slide thay vì fade
        adaptiveHeight: true,
        dotsClass: "slick-dots custom-dots",
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    fade: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    dots: true,
                    fade: false,
                    speed: 600,
                }
            }
        ]
    };

    const [listProductCategory, setListProductCategory] = useState<Array<any>>([])

    const onGetListCategoryProductAsync = async () => {
        const param = {
            limit: 8,
        }
        try {
            await categoryProductService.GetCategory(
                param,
                () => { }
            ).then((res) => {
                setListProductCategory(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListCategoryProductAsync().then(_ => { });
    }, []);

    return (
        <div className="car-tech-slider-container">
            <div className="slider-header">
                <h1 className="main-title">
                    ĐỘI NGŨ CHUYÊN GIA <span className="highlight">Ô TÔ</span>
                </h1>
                <p className="subtitle">
                    Công nghệ bảo vệ & nâng cấp xe hơi chuyên nghiệp
                </p>
            </div>

            <div className="slider-wrapper">
                <Slider {...settings}>
                    {listProductCategory.map((slide) => (
                        <div key={slide.id} className="car-slide-item">
                            <div
                                className="car-slide-content"
                                style={{
                                    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
                                    borderColor: "#FFD700"
                                }}
                            >
                                <div className="car-slide-left">
                                    <div className="product-badge">
                                        <span className="badge-text">DANH MỤC SẢN PHẨM</span>
                                    </div>

                                    <h2 className="car-slide-title">
                                        <span className="title-text">{slide.name}</span>
                                    </h2>

                                    <p className="car-slide-description text-truncate-4">{slide.description}</p>
                                </div>

                                <div className="car-slide-right">
                                    <div className="car-image-container">
                                        <div
                                            className="car-image-placeholder"
                                            style={{
                                                backgroundImage: `url(${configImageURL(slide.image)})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SloganSlider;