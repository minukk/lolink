import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../../components/Atoms/Alert';

describe('<Alert />', () => {
  let onCloseMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    render(<Alert message="테스트 메시지" onClose={onCloseMock} />);
  });

  it('올바르게 렌더링 되는지 확인', () => {
    expect(screen.getByText("테스트 메시지")).toBeInTheDocument();
    expect(screen.getByText("닫기")).toBeInTheDocument();
  });

  it('닫기 버튼을 클릭하면 onClose 함수가 호출되는지 확인', () => {
    const closeButton = screen.getByText("닫기");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('2초 후에 자동으로 닫히는지 확인', async () => {
    jest.useFakeTimers();
    render(<Alert message="테스트 메시지" onClose={onCloseMock} />);
    jest.advanceTimersByTime(2000);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
