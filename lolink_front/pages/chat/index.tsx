import React, { useEffect, useState } from 'react'
import { socketPrivate } from '../api/socket';
import { userState } from '../../stores/user';
import ChatModal from '../../components/Organisms/ChatModal';
import HeadTitle from '../../components/Atoms/HeadTitle';
import Typograph from '../../components/Atoms/Typograph';

interface ItemProps {
  buyerId: string;
  buyerNickname: string;
  sellerId: string;
  sellerNickname: string;
  productId: string;
  productPrice: number;
  title: string;
}

const Chat = () => {
  const { state } = userState();
  const [isChatModal, setIsChatModal] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    socketPrivate.auth = { userId: state?.id, nickname: state?.nickname };
    socketPrivate.connect();
    socketPrivate.emit('my-chat-room');
    
    socketPrivate.on('connect_error', (err) => {
      if(err.message === 'invalid username') {
        console.log(err);
      }
    });
  }, []);

  useEffect(() => {
    const setChat = (data) => {
      setChatList(data.room);
    }

    
    socketPrivate.on('chat-room-list', setChat);
    return () => {
      socketPrivate.off('chat-room-list', setChat);
    }
  }, [])

  console.log('room', chatList)

  const handleSocket = ({ buyerId, sellerId, productId, title, buyerNickname, sellerNickname, productPrice }: ItemProps) => {
    // 내가 구매자면 상대방은 판매자. 반대도 마찬가지.
    const opponentId = state?.id === buyerId ? sellerId : buyerId;
    const opponentNickname = state?.id === buyerId ? sellerNickname : buyerNickname;
    socketPrivate.emit('reqJoinRoom', {
      fromUserId: state?.id,
      toUserId: opponentId,
      productId: productId,
    });

    setProduct({
      id: productId,
      title: title,
      price: productPrice,
      userId: opponentId,
      nickname: opponentNickname,
    })
  }

  const handleModal = () => {
    setIsChatModal(false);
  };

  const handleChat = (items: ItemProps) => {
    if (!state) {
      return;
    }
    handleSocket(items);
    setIsChatModal(true);
  }

  return (
    <>
      <HeadTitle title='LoLink | 내 채팅' />
      <div className='my-20 text-center '>
        <h3 className='w-full mb-10 text-3xl text-sky'>내 채팅</h3>
        {chatList 
        ? <div className='flex flex-wrap justify-center border-2 rounded-lg border-sky w-320'>
            <ul className='w-full'>
              {chatList.map((item, i) => (
                <li key={i} className='flex justify-between p-4 text-xl text-sky hover:text-white hover:bg-sky' onClick={() => handleChat(item)}>
                  <Typograph tag='empty-span'>{item?.buyerNickname === state?.nickname ? item?.sellerNickname : item?.buyerNickname}</Typograph>
                  <Typograph tag='empty-span'>{item?.title}</Typograph>
                  <Typograph tag='empty-span'>{item?.productPrice?.toLocaleString('ko-KR')}원</Typograph>
                </li>
              )
              )}
            </ul>
            {isChatModal && <ChatModal handleModal={handleModal} {...product} />}
          </div>
        : <div className='text-2xl text-sky'>채팅이 없습니다.</div>
        } 
      </div>
    </>
  )
}

export default Chat