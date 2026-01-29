"use client";

import { useState, useEffect, useRef } from 'react';
import styles from "@/assets/styles/components/header.module.css";
import logo from '@/assets/images/logo.png'
import { ROUTE_PATH } from '@/core/common/appRouter';
import Link from 'next/link';
import Image from 'next/image';
import SearchBoxHeader from './SearchBox';
import authService from '@/infrastructure/repository/auth/auth.service';
import { ProductInterface } from '@/infrastructure/interface/product/product.interface';
import { convertSlug } from '@/infrastructure/helper/helper';
import productService from '@/infrastructure/repository/product/product.service';
import brandService from '@/infrastructure/repository/brand/brand.service';
import categoryBlogService from '@/infrastructure/repository/category/categoryBlog.service';
import { CategoryProductInterface } from '@/infrastructure/interface/category/categoryProduct.interface';
import categoryProductService from '@/infrastructure/repository/category/categoryProduct.service';
import { isTokenStoraged } from '@/infrastructure/utils/storage';
import { useRecoilState } from 'recoil';
import { ProductState } from '@/core/common/atoms/product/productState';
import { ProfileState } from '@/core/common/atoms/profile/profileState';
import { BrandState } from '@/core/common/atoms/brand/brandState';
import { CategoryAgencyState, CategoryBlogState, CategoryProductHrefState, CategoryProductState } from '@/core/common/atoms/category/categoryState';
import { usePathname } from 'next/navigation';
import categoryAgencyService from '@/infrastructure/repository/category/categoryAgency.service';

const HeaderSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname(); // Lấy đường dẫn hiện tại
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const [, setCategoryProductState] = useRecoilState(CategoryProductState);
    const [categoryProductHrefState, setCategoryProductHrefState] = useRecoilState(CategoryProductHrefState);
    const [, setCategoryBlogState] = useRecoilState(CategoryBlogState);
    const [, setCategoryAgencyState] = useRecoilState(CategoryAgencyState);
    const [, setBrandState] = useRecoilState(BrandState);
    const [, setProfileState] = useRecoilState(ProfileState);
    const [productState, setProductState] = useRecoilState(ProductState);
    const token = isTokenStoraged();

    // Xác định menu active dựa trên URL
    const getActiveMenu = () => {
        if (pathname === "/") return "home";
        if (pathname.startsWith(ROUTE_PATH.PRODUCT)) return "products";
        if (pathname.startsWith(ROUTE_PATH.BLOG)) return "blog";
        if (pathname.includes(ROUTE_PATH.AGENCY)) return "agency";
        return "";
    };

    const activeMenu = getActiveMenu();

    const onGetListCategoryAsync = async () => {
        try {
            await categoryProductService.GetCategory(
                {},
                () => { }
            ).then((res) => {
                setCategoryProductState({
                    data: res.data
                })
                const data = res.data?.map((item: CategoryProductInterface) => {
                    const result = {
                        href: `${ROUTE_PATH.PRODUCT}?category_id=${item.id}`,
                        label: item.name,
                    }
                    return result;
                })

                setCategoryProductHrefState({
                    data: data
                })

            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListBlogCategoryAsync = async () => {
        try {
            await categoryBlogService.GetBlogCategory(
                {},
                () => { }
            ).then((res) => {
                setCategoryBlogState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListAgencyCategoryAsync = async () => {
        try {
            await categoryAgencyService.GetAgencyCategory(
                {
                    limit: 1000
                },
                () => { }
            ).then((res) => {
                setCategoryAgencyState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListBrandAsync = async () => {
        try {
            await brandService.GetBrand(
                {},
                () => { }
            ).then((res) => {
                setBrandState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetProfileAsync = async () => {
        if (token) {
            try {
                await authService.profile(
                    () => { }
                ).then((res) => {
                    setProfileState({
                        data: res
                    })
                })
            }
            catch (error) {
                console.error(error)
            }
        }
    }

    const onGetListProductAsync = async () => {
        try {
            await productService.GetProduct(
                {},
                () => { }
            ).then((res) => {
                const data = res.data?.map((item: ProductInterface) => {
                    const result = {
                        href: `${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`,
                        label: item.name,
                    }
                    return result;
                })

                setProductState({
                    data: data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListCategoryAsync().then(_ => { });
        onGetListBlogCategoryAsync().then(_ => { });
        onGetListBrandAsync().then(_ => { });
        onGetListProductAsync().then(_ => { });
        onGetListAgencyCategoryAsync().then(_ => { });
    }, []);

    useEffect(() => {
        if (token) {
            onGetProfileAsync().then(_ => { });
        }
    }, [token]);


    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout(() => { })
                .then(() => {
                    window.location.href = ROUTE_PATH.HOME_PAGE;
                })
        } catch (error) {
            console.error(error);
        }
    };

    const menuItems = [
        {
            id: "home",
            label: "TRANG CHỦ",
            href: ROUTE_PATH.HOME_PAGE,
        },
        {
            id: "introduce",
            label: "GIỚI THIỆU",
            href: ROUTE_PATH.INTRODUCE,
        },
        {
            id: "products",
            label: "SẢN PHẨM",
            href: ROUTE_PATH.PRODUCT,
            dropdown: categoryProductHrefState.data
        },
        {
            id: "agency",
            label: "ĐẠI LÝ",
            href: ROUTE_PATH.AGENCY,
        },
        {
            id: "blog",
            label: "TIN TỨC",
            href: ROUTE_PATH.BLOG,
        },
        {
            id: "contact",
            label: "LIÊN HỆ",
            href: ROUTE_PATH.CONTACT,
        },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveDropdown(null);
    };

    const toggleDropdown = (id: string | null) => {
        if (activeDropdown === id) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(id);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setActiveDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className="padding-common-layout">
                <div className={styles.container}>
                    <Link href={ROUTE_PATH.HOME_PAGE} className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <Image src={logo} alt="RIMO" width={50} height={50} />
                        </div>
                    </Link>

                    {/* Menu Desktop */}
                    <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                        {/* SearchBox trên mobile */}
                        <div className={styles.mobileSearchTop}>
                            <SearchBoxHeader />
                        </div>

                        {/* Menu items */}
                        <ul className={styles.menu}>
                            {menuItems.map((item) => (
                                <li
                                    key={item.id}
                                    className={`${styles.menuItem} ${item.dropdown ? styles.hasDropdown : ''}`}
                                >
                                    {item.dropdown ? (
                                        <div className={styles.dropdownContainer} ref={dropdownRef}
                                            onMouseEnter={() => toggleDropdown(item.id)}
                                            onMouseLeave={() => toggleDropdown(null)}
                                        >
                                            <Link href={item.href}
                                                className={styles.menuLink}

                                                aria-expanded={activeDropdown === item.id}
                                            >
                                                {item.label}
                                                <span className={styles.dropdownArrow}>
                                                    {activeDropdown === item.id ? '▲' : '▼'}
                                                </span>
                                            </Link>
                                            <div
                                                className={`${styles.dropdownMenu} ${activeDropdown === item.id ? styles.dropdownOpen : ''}`}
                                            >
                                                {item.dropdown.map((subItem, index) => (
                                                    <Link
                                                        key={index}
                                                        href={subItem.href}
                                                        className={styles.dropdownItem}
                                                        onClick={() => {
                                                            setIsMenuOpen(false);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={styles.menuLink}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Nút đăng nhập cho mobile */}
                        <div className={styles.mobileActions}>
                            <button className={styles.loginButtonMobile}>Đăng nhập</button>
                        </div>
                    </nav>

                    {/* Phần bên phải (tìm kiếm + đăng nhập) cho desktop */}
                    <div className={styles.rightSection}>
                        <SearchBoxHeader />
                        <button className={styles.loginButton}>Đăng nhập</button>
                    </div>

                    {/* Nút menu mobile */}
                    <button
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;