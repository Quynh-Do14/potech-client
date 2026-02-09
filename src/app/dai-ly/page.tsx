'use client'
import { ROUTE_PATH } from '@/core/common/appRouter';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout';
import agencyService from '@/infrastructure/repository/agency/agency.service';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from '@/assets/styles/pages/agency/agency.module.css'
import Image from 'next/image';
import { configImageURL } from '@/infrastructure/helper/helper';
import SelectSearchCommon from '@/infrastructure/common/input/select-search-common';
import ButtonCommon from '@/infrastructure/common/button/button-common';
import { useRecoilValue } from 'recoil';
import { CategoryAgencyState } from '@/core/common/atoms/category/categoryState';
import districtService from '@/infrastructure/repository/district/district.service';
import InputSearchCommon from '@/infrastructure/common/input/input-search-common';
import SelectSearchProvince from '@/infrastructure/common/input/select-search-province';
import { AgencyInterface, AgencyParams } from '@/infrastructure/interface/agency/agency.interface';
import BannerCommon from '@/infrastructure/common/banner/BannerCommon';
import banner from '@/assets/images/banner/banner-daily.jpg';
import GoogleMapView from './ggmap';
import AgencySkeleton from './skeleton';

const AgencyContent = () => {
    const [listAgency, setListAgency] = useState<Array<AgencyInterface>>([])
    const [searchText, setSearchText] = useState<string>("");
    const [totalPage, setTotalPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [provinceSelected, setProvinceSelected] = useState<string>("");
    const [districtSelected, setDistrictSelected] = useState<string>("");
    const [categoryIdSelected, setCategoryIdSelected] = useState<string>("");
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const [selectedAgency, setSelectedAgency] = useState<AgencyInterface | null>();
    const [map, setMap] = useState<any>({});

    const [listProvince, setListProvince] = useState<Array<any>>([])
    const [listDistrict, setListDistrict] = useState<Array<any>>([])
    const categoryAgencyState = useRecoilValue(CategoryAgencyState).data;

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams?.get('search') || '';
    const page = searchParams?.get('page') || '1';
    const limit = searchParams?.get('limit') || '10';
    const province = searchParams?.get('province') || '';
    const district = searchParams?.get('district') || '';
    const categoryId = searchParams?.get('category_id') || '';

    const mapContainerRef = useRef<any>(null);

    const onGetListAgencyAsync = async ({ name = searchText, limit = pageSize, page = currentPage, province = provinceSelected, district = districtSelected, category_id = categoryIdSelected }) => {
        const param: AgencyParams = {
            page: page,
            limit: limit,
            search: name,
            province: province,
            district: district,
            category_id: category_id
        };

        try {
            const res = await agencyService.GetAgency(param, setLoading);

            setListAgency(res.data);
            setTotalElement(res.limit);
            setTotalPage(res.totalPages);
            setTotal(res.total);
        } catch (error) {
            console.error(error);
        }
    };


    const onSearch = async (name = searchText, limit = pageSize, page = 1, province = provinceSelected, district = districtSelected, category_id = categoryIdSelected) => {
        await onGetListAgencyAsync({ name: name, limit: limit, page: page, province: province, district: district, category_id: category_id }).then(_ => { });
    };

    const onSearchParam = async () => {
        // Tạo URL mới với search params
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('search', searchText);
        params.set('province', provinceSelected);
        params.set('district', districtSelected);
        params.set('category_id', categoryIdSelected);
        params.set('page', '1'); // Reset về trang 1 khi search
        router.replace(`${ROUTE_PATH.AGENCY}?${params.toString()}`,
            {
                scroll: false  // Không scroll lên đầu trang
            });

        await onSearch(searchText, pageSize, 1, provinceSelected, districtSelected, categoryIdSelected).then(_ => { });
        setSelectedAgency(null);
    }

    const onChangeSearchText = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const onChangeProvince = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvinceSelected(e.target.value);
    };

    const onChangeDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrictSelected(e.target.value);
    };

    const onChangeCategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryIdSelected(e.target.value);
    };

    const onChangePage = async (page: number) => {
        setCurrentPage(page);

        // Cập nhật params với page mới
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('page', page.toString());
        router.replace(`${ROUTE_PATH.AGENCY}?${params.toString()}`,
            {
                scroll: false  // Không scroll lên đầu trang
            });

        await onSearch(searchText, pageSize, page, provinceSelected, districtSelected, categoryIdSelected).then(_ => { });
    }


    useEffect(() => {
        const parsedPage = parseInt(page) || 1;
        const parsedLimit = parseInt(limit) || 10;
        const parsedSearch = search || "";
        const parsedProvince = province || "";
        const parsedDistrict = district || "";
        const parsedCategoryId = categoryId || "";

        setSearchText(parsedSearch);
        setCurrentPage(parsedPage);
        setPageSize(parsedLimit);
        setProvinceSelected(parsedProvince);
        setCategoryIdSelected(parsedCategoryId);

        onSearch(parsedSearch, parsedLimit, parsedPage, parsedProvince, parsedDistrict, parsedCategoryId);
    }, [search, page, limit, province, district, categoryId]); // Theo dõi các giá trị từ searchParams

    const onSelectAgency = (item: AgencyInterface) => {
        setSelectedAgency(item);
    };
    const onGetListProvinceAsync = async () => {
        const param = {

        }
        try {
            await districtService.getAll(
                param,
                () => { }
            ).then((res) => {
                setListProvince(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    const onGetListDistrictAsync = async () => {
        if (provinceSelected) {
            try {
                await districtService.getDetail(
                    String(provinceSelected).split('-')[0],
                    () => { }
                ).then((res) => {
                    setListDistrict(res.districts);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        onGetListProvinceAsync().then(_ => { });
    }, []);

    useEffect(() => {
        onGetListDistrictAsync().then(_ => { });
    }, [provinceSelected]);

    useLayoutEffect(() => {
        setInitialLoading(false);
    });

    const onReset = () => {
        setSearchText('');
        setDistrictSelected('');
        setProvinceSelected('');
        setCategoryIdSelected('');
        setCurrentPage(1);
        router.replace(`${ROUTE_PATH.AGENCY}`,
            {
                scroll: false  // Không scroll lên đầu trang
            }
        );
    }

    return (
        <ClientLayout>
            <BannerCommon
                type='AGENCY'
            />
            <div className={styles.agencyContainer}>
                <div className='padding-common'>
                    <BreadcrumbCommon
                        breadcrumb={"Đại lý"}
                        redirect={ROUTE_PATH.AGENCY}
                        title={"Danh sách đại lý"}
                        blackColor={true}
                    />
                    <div className={styles.agencyContent}>
                        <div className="pageHeader">
                            <div className="badge">
                                <span className="badgeText">Đại lý & Chi nhánh</span>
                            </div>
                            <h1 className="headerTitle">
                                <span className="highlight">Danh Sách</span> Đại Lý
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 mb-8">
                            {/* Search Input - 5/12 columns on desktop, full on mobile */}
                            <div className="sm:col-span-3">
                                <InputSearchCommon
                                    placeholder={'Tìm kiếm đại lý'}
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <SelectSearchProvince
                                    listDataOfItem={listProvince}
                                    onChange={onChangeProvince}
                                    valueName='code'
                                    labelName='name'
                                    value={provinceSelected}
                                    label={'Tỉnh/Thành phố'}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <SelectSearchCommon
                                    listDataOfItem={listDistrict}
                                    onChange={onChangeDistrict}
                                    valueName='name'
                                    labelName='name'
                                    value={districtSelected}
                                    label={'Quận/Huyện'} />
                            </div>
                            <div className="sm:col-span-3">
                                <SelectSearchCommon
                                    listDataOfItem={categoryAgencyState}
                                    onChange={onChangeCategory}
                                    valueName='id'
                                    labelName='name'
                                    label={'Dòng sản phẩm'}
                                    value={categoryIdSelected} />
                            </div>
                            <div className="sm:col-span-2">
                                <ButtonCommon
                                    onClick={onSearchParam}
                                    title={'Tìm kiếm'}
                                />
                            </div>
                        </div>

                        <div className={styles.agencyContainer}>
                            <div className={styles.agencyMain}>
                                <div className={styles.leftSide}>
                                    <div className={styles.leftSideContent}>
                                        {
                                            initialLoading || loading ? (
                                                <AgencySkeleton />
                                            ) :
                                                listAgency.length > 0 ?
                                                    listAgency.map((item, index) => (
                                                        <div
                                                            className={`${styles.agencyCard} ${selectedAgency?.id == item.id ? styles.active : null}`}
                                                            key={index}
                                                            onClick={() => onSelectAgency(item)}
                                                        >
                                                            <div className={styles.cardImage}>
                                                                <div className={styles.imageOverlay}></div>
                                                                <Image
                                                                    src={configImageURL(item.image)}
                                                                    alt={item.name}
                                                                    width={300}
                                                                    height={200}
                                                                    className={styles.cardImageImg}
                                                                />
                                                                <div className={styles.cardRating}>
                                                                    <svg className={styles.starIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                    </svg>
                                                                    <span className={styles.ratingText}>{item.star_rate}</span>
                                                                </div>
                                                            </div>

                                                            <div className={styles.cardContent}>
                                                                <div className={styles.cardHeader}>
                                                                    <h3 className={styles.cardName}>{item.name}</h3>
                                                                </div>
                                                                <div className={styles.cardInfo}>
                                                                    <div className={styles.infoItem}>
                                                                        <div className={styles.infoIconWrapper}>
                                                                            <svg className={styles.infoIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                                                <circle cx="12" cy="10" r="3"></circle>
                                                                            </svg>
                                                                        </div>
                                                                        <div className={styles.infoContent}>
                                                                            <p className={styles.cardAddress}>{item.address}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className={styles.infoItem}>
                                                                        <div className={styles.infoIconWrapper}>
                                                                            <svg className={styles.infoIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className={styles.infoContent}>
                                                                            <p className={styles.cardPhone}>{item.phone_number}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className={styles.cardFooter}>
                                                                    <button className={styles.viewBtn}>
                                                                        <span>Xem vị trí</span>
                                                                        <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                            <path d="M5 12h14"></path>
                                                                            <path d="M12 5l7 7-7 7"></path>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                    : (
                                                        <div className={styles.galleryContainer}>
                                                            <div className={styles.noDataContainer}>
                                                                <div className={styles.noDataIcon}>
                                                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                        <circle cx="12" cy="12" r="10" />
                                                                        <line x1="8" y1="8" x2="16" y2="16" />
                                                                        <line x1="16" y1="8" x2="8" y2="16" />
                                                                    </svg>
                                                                </div>
                                                                <h3 className={styles.noDataTitle}>Không tìm thấy đại lý</h3>
                                                                <p className={styles.noDataDescription}>
                                                                    Không có đại lý nào phù hợp với tìm kiếm của bạn.
                                                                </p>
                                                                <ButtonCommon
                                                                    onClick={onReset}
                                                                    title={'Xóa bộ lọc'}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                    </div>
                                </div>
                                <div className={styles.rightSide}>
                                    <GoogleMapView
                                        agencies={listAgency}
                                        selectedAgency={selectedAgency}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

const AgencyPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AgencyContent />
        </Suspense>
    );
};

export default AgencyPage