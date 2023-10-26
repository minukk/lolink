import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LocationInput from '../../Components/Molecules/LocationInput';

const LOCATION = [
  { area: '서울', detail: ['강남구', '강북구'] },
  { area: '부산', detail: ['해운대구', '강서구'] }
];

describe('<LocationInput />', () => {
  it('location 및 locationDetail props가 제대로 전달되는지 확인', () => {
    const location = {
      location: '서울',
      locationDetail: '강남구'
    };

    const setLocation = jest.fn();

    const { getByDisplayValue } = render(
      <LocationInput location={location} setLocation={setLocation} />
    );

    expect(getByDisplayValue(location.location)).toBeInTheDocument();
    expect(getByDisplayValue(location.locationDetail)).toBeInTheDocument();
  });

  it('지역 선택 변경 시 setLocation 함수 호출 확인', () => {
    const location = {
      location: '서울',
      locationDetail: '강남구'
    };

    const setLocation = jest.fn();

    const { getByDisplayValue } = render(
      <LocationInput location={location} setLocation={setLocation} />
    );

    const locationSelect = getByDisplayValue(location.location);
    fireEvent.change(locationSelect, { target: { value: '부산' } });

    expect(setLocation).toHaveBeenCalledWith({
      location: '부산',
      locationDetail: '강남구'
    });
  });

  it('상세 지역 선택 변경 시 setLocation 함수 호출 확인', () => {
    const location = {
      location: '서울',
      locationDetail: '강남구'
    };

    const setLocation = jest.fn();

    const { getByDisplayValue } = render(
      <LocationInput location={location} setLocation={setLocation} />
    );

    const locationDetailSelect = getByDisplayValue(location.locationDetail);
    fireEvent.change(locationDetailSelect, { target: { value: '강북구' } });

    expect(setLocation).toHaveBeenCalledWith({
      location: '서울',
      locationDetail: '강북구'
    });
  });
});
