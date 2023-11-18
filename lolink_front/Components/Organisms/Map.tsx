import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import locations from '../../utils/locations';

interface ILocation {
  loaded: boolean;
  coordinates: { latitude: number, longitude: number};
  error?: { code: number, message: string};
}

const containerStyle = {
  width: '1200px',
  height: '650px'
};

const OPTIONS = {
  minZoom: 8,
  maxZoom: 14,
}

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP as string,
  });

  const [location, setLocation] = useState<ILocation>({
    loaded: false,
    coordinates: { latitude: 0, longitude: 0 }, // 서울 경,위도로 수정.
  });

  const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    });
  };

  const onError = (error: { code: number; message: string; }) => {
    setLocation({
      ...location,
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      })
      return;
    }

    geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])
  
  const center = {
    lat: location.coordinates.latitude || 37.5649867,
    lng: location.coordinates.longitude || 126.985575
  };

  return (
    <section className='flex'>
      <div>
        <p>검색창</p>
      </div>
      <div className='mb-10 border-2 rounded-lg border-primary'>
        {isLoaded && <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={OPTIONS}
          >
            {locations.map((item, index) => (
              <Marker 
                key={index}
                position={{ lat: item.lat, lng: item.lng }}
                label={{
                  text: String(index),
                  color: '#6caddf', // 텍스트 색상
                  fontSize: '18px', // 폰트 크기
                }}
                icon={{
                  url: 'icons/marker.svg',
                  scaledSize: new window.google.maps.Size(50, 50)
                }}/>
            ))}
          </GoogleMap>
        }
      </div>
    </section>
  )
}



export default Map;
