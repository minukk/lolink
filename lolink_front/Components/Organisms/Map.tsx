import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { NextPage } from 'next';

interface ILocation {
  loaded: boolean;
  coordinates: { latitude: number, longitude: number};
  error?: { code: number, message: string};
}

interface IProps {
  map: any;
}

const Map:NextPage<IProps> = ({ map }) => {
  const [location, setLocation] = useState<ILocation>({
    loaded: false,
    coordinates: { latitude: 0, longitude: 0 }, // 서울 경,위도로 수정.
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const topoJson = feature(map, map?.objects.SIDO_MAP);

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

  useEffect(() => {
    const width = 1280;
    const height = 800;

    const svg = d3.select(mapRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    const map = svg.append('g');
    
    // d3.geoPath를 사용하여 지도 경로 생성
    const { longitude, latitude } = location.coordinates;
    // const projection = d3.geoMercator()
    // .center([longitude, latitude]) // 사용자의 위치로 중심을 이동합니다.
    // .scale(0.3) // 적당한 스케일 값으로 줌합니다.
    // .translate([0, 0]); // SVG 내에서의 위치를 조정합니다.
    const projection = d3.geoMercator().scale(1).translate([0, 0]);

    const path = d3.geoPath().projection(projection);
    const bounds = path.bounds(topoJson);
    const widthScale = (bounds[1][0] - bounds[0][0]) / width; 
    const heightScale = (bounds[1][1] - bounds[0][1]) / height; 
    const scale = 1.2 /Math.max(widthScale, heightScale);
    const xoffset = width/2 - scale * (bounds[1][0] + bounds[0][0]) /2 + 10; 
    const yoffset = height/2 - scale * (bounds[1][1] + bounds[0][1])/2 + 80; 
    const offset = [xoffset, yoffset];
    projection.scale(scale).translate(offset);
    
    // 지도 데이터를 바탕으로 경로를 그림
    const regions = map
      .selectAll('path').data(topoJson.features)
      .enter().append('path') 
      .attr('d', path)
      .style('stroke', '#fff')
      .style('fill', '#6caddf');

    svg.append('circle')
        .attr('cx', projection([longitude, latitude])[0])
        .attr('cy', projection([longitude, latitude])[1])
        .attr('r', 10)
        .attr('fill', 'white')
        .attr('stroke', 'white');

    // 줌 인/아웃 이벤트 핸들러
    const zoomed = (event) => {
      const { transform } = event;
      regions.attr('transform', transform);
      regions.attr('stroke-width', 1 / transform.k);
    }

    // 줌 기능 활성화
    const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed)
    svg.call(zoom);
  }, [map]);

  return (
    <div className='mb-10 border-2 rounded-lg border-primary'>
      <div ref={mapRef} />
    </div>
  )
}

export default Map;
