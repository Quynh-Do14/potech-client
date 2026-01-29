'use client';

import { AgencyInterface } from '@/infrastructure/interface/agency/agency.interface';
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import locationIcon from '@/assets/images/icon/location3.png'
import Image from 'next/image';
import { configImageURL } from '@/infrastructure/helper/helper';

type Props = {
    agencies: AgencyInterface[];
    selectedAgency?: AgencyInterface | null;
};

const containerStyle = {
    width: '100%',
    height: '100%',
};

export default function GoogleMapView({ agencies, selectedAgency }: Props) {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [mapCenter, setMapCenter] = useState({ lat: 21.0278, lng: 105.8342 });

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyD1ICiOLsU1OSuiEOMkjP0gvVHbu1jDsY8',
    });

    /** Map load */
    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    /** 🔥 Xử lý khi selectedAgency thay đổi */
    useEffect(() => {
        if (!selectedAgency || !mapRef.current) return;

        const map = mapRef.current;
        
        // Chuyển đổi tọa độ sang number
        const targetLat = Number(selectedAgency.lat);
        const targetLng = Number(selectedAgency.long);
        
        // Kiểm tra tọa độ hợp lệ
        if (isNaN(targetLat) || isNaN(targetLng)) {
            console.error('Invalid coordinates for agency:', selectedAgency);
            return;
        }

        const target = { lat: targetLat, lng: targetLng };
        
        // Cập nhật center của map
        setMapCenter(target);
        
        // Thực hiện animation bay đến vị trí với zoom 12
        map.panTo(target);
        map.setZoom(12);

        // Chọn marker này làm active
        setActiveId(selectedAgency.id ?? null);

        // 🔥 Delay để đảm bảo map đã render xong rồi mới điều chỉnh vị trí marker
        setTimeout(() => {
            if (!mapRef.current) return;
            
            const map = mapRef.current;
            const mapDiv = map.getDiv() as HTMLElement;
            
            // Tính toán offset để đưa marker lên trên một chút (khoảng 30% từ đỉnh)
            const offsetY = mapDiv.offsetHeight * 0.3; // Điều chỉnh 0.3 để marker nằm ở vị trí tốt hơn
            
            // Dùng panBy để điều chỉnh vị trí
            map.panBy(0, -offsetY);
        }, 100); // Giảm timeout xuống 100ms để mượt hơn

    }, [selectedAgency]);

    /** 🔥 Reset activeId khi selectedAgency là null */
    useEffect(() => {
        if (!selectedAgency) {
            setActiveId(null);
        }
    }, [selectedAgency]);

    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={12}
            onLoad={onLoad}
            options={{
                // Thêm options để map mượt hơn
                gestureHandling: 'greedy',
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: false,
                fullscreenControl: true,
            }}
        >
            {agencies.map(item => {
                const lat = Number(item.lat);
                const lng = Number(item.long);
                
                // Kiểm tra tọa độ hợp lệ trước khi render marker
                if (isNaN(lat) || isNaN(lng)) {
                    console.warn('Invalid coordinates for agency:', item);
                    return null;
                }

                return (
                    <Marker
                        icon={{
                            url: locationIcon.src,
                            scaledSize: new google.maps.Size(30, 45),
                            anchor: new google.maps.Point(15, 45), // Điều chỉnh anchor cho chính xác hơn
                        }}
                        key={item.id}
                        position={{ lat, lng }}
                        onClick={() => {
                            setActiveId(item.id ?? null);
                            // Cập nhật center khi click vào marker
                            if (mapRef.current) {
                                mapRef.current.panTo({ lat, lng });
                                mapRef.current.setZoom(12);
                            }
                        }}
                    >
                        {activeId === item.id && (
                            <InfoWindow 
                                onCloseClick={() => setActiveId(null)}
                                position={{ lat, lng }}
                                options={{
                                    pixelOffset: new google.maps.Size(0, -45), // Điều chỉnh vị trí info window
                                }}
                            >
                                <div className="agency-popup">
                                    <Image
                                        src={configImageURL(item.image)}
                                        alt={item.name}
                                        width={150}
                                        height={150}
                                    />
                                    <strong>{item.name}</strong>

                                    <div className="popup-row">
                                        <svg width="16" height="16" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                                        </svg>
                                        <span>{item.address}</span>
                                    </div>

                                    <div className="popup-row">
                                        <svg width="16" height="16" viewBox="0 0 24 24">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                        </svg>
                                        <span>{item.phone_number}</span>
                                    </div>

                                    {item.categories.length > 0 && (
                                        <div className="popup-row">
                                            <svg width="16" height="16" viewBox="0 0 24 24">
                                                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
                                            </svg>
                                            <span>
                                                {item.categories?.map(c => c.category_name).join(', ')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                );
            })}
        </GoogleMap>
    );
}