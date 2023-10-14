import React, { useState } from 'react'

interface ILocation {
  location: string;
  locationDetail: string;
}

type ISetLocationType = React.Dispatch<React.SetStateAction<ILocation>>;

interface IProps {
  location: ILocation;
  setLocation: ISetLocationType;
}

const LocationInput = ({ location, setLocation }: IProps) => {
  const [detail, setDetail] = useState(LOCATION[0].detail);
  
  const handleLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenArea = e.target.value;
    const matchingDetail = LOCATION.find((item) => item.area === chosenArea);

    setLocation({
      ...location,
      location: chosenArea
    });
    setDetail(matchingDetail ? matchingDetail.detail: []);
  }

  const handleLocationDetail = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation({
      ...location,
      locationDetail: e.target.value,
    })
  }

  return (
    <div className='px-2 font-bold text-sky'>
      <select name='지역' value={location.location} onChange={handleLocation} className='mx-6 mb-4 outline-none'>
        {LOCATION.map((location) => 
          <option value={location.area} key={location.area}>{location.area}</option>
        )}
      </select>
      <select name='상세지역' value={location.locationDetail} onChange={handleLocationDetail}>
        {detail.map((detail) => (
          <option key={detail} value={detail}>
            {detail}
          </option>
        ))}
      </select>
    </div>
  )
}

const LOCATION = [
  {
    area: '서울',
    detail: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  },
  {
    area: '부산',
    detail: ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'],
  },
  {
    area: '대구',
    detail: ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군'],
  },
  {
    area: '인천',
    detail: ['계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'],
  },
  {
    area: '광주',
    detail: ['광산구', '남구', '동구', '북구', '서구'],
  },
  {
    area: '대전',
    detail: ['대덕구', '동구', '서구', '유성구', '중구'],
  },
  {
    area: '울산',
    detail: ['남구', '동구', '북구', '중구', '울주군'],
  },
  {
    area: '세종',
    detail: [],
  },
  {
    area: '경기',
    detail: ['수원', '고양', '성남', '용인', '부천', '안산', '남양주', '안양', '화성', '평택', '의정부', '시흥', '파주', '김포', '광명', '광주', '군포', '오산', '이천', '양주', '안성', '구리', '포천', '의왕', '하남'],
  },
  {
    area: '강원',
    detail: ['강릉', '동해', '삼척', '속초', '원주', '태백', '고성', '양구', '양양', '영월', '인제', '정선', '철원', '평창', '홍천', '화천', '횡성'],
  },
  {
    area: '충북',
    detail: ['청주', '제천', '충주', '괴산', '단양', '보은', '영동', '옥천', '음성', '진천', '증평', '청원'],
  },
  {
    area: '충남',
    detail: ['천안', '공주', '논산', '보령', '서산', '아산', '금산', '당진', '부여', '서천', '연기', '예산', '청양', '태안', '홍성'],
  },
  {
    area: '전북',
    detail: ['군산', '김제', '남원', '익산', '전주', '정읍', '고창', '무주', '부안', '순창', '완주', '임실', '장수', '진안'],
  },
  {
    area: '전남',
    detail: ['광양', '나주', '목포', '순천', '여수', '강진', '고흥', '곡성', '구례', '담양', '무안', '보성', '신안', '영광', '영암', '완도', '장성', '장흥', '진도', '함평', '해남'],
  },
  {
    area: '경북',
    detail: ['경산', '경주', '구미', '김천', '문경', '상주', '안동', '영천', '포항', '고령', '군위', '봉화', '성주', '영덕', '영양', '예천', '울릉', '울진', '의성', '청도', '청송', '칠곡'],
  },
  {
    area: '경남',
    detail: ['거제', '김해', '밀양', '사천', '양산', '진주', '창원', '통영', '거창', '고성', '남해', '산청', '의령', '창녕', '하동', '함안', '함양', '합천'],
  },
  {
    area: '제주',
    detail: ['서귀포', '제주'],
  } 
];

export default LocationInput