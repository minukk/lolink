import { socketPrivate } from '../../pages/api/socket';
import { userState } from '../../stores/user';
import { IChat } from '../../types/chat';
import { displayCreatedAt } from '../../utils/dateForm';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { BiMoney, BiX } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { getUserInfo } from '../../pages/api/user';

const ChatModal = ({ handleModal, ...product }: any) => {
  const { state } = userState();
  const [chatMsg, setChatMsg] = useState('');
  const [chat, setChat] = useState<any>([]);
  const { data: userData } = useQuery(['users'], () => getUserInfo())
  const chatId = state?.id === product.userId
  const chatOpponentId = state?.id !== product.id && state?.id;

  console.log(userData?.data);

  useEffect(() => {
    const setChatListInit = (data: any) => {
      console.log('data', data);
      setChat(data.chat.map((msg: IChat) => ({
        chat: msg.chat,
        fromUserId: msg.fromUserId,
        toUserId: msg.toUserId,
        time: msg.time,
      }))
      );
    }
    // 바뀌어야 함.
    console.log('state', state);
    // console.log('buyerId', chatId ? state?.id : product.userId);
    // console.log('sellerId', chatId ? product.userId : state?.id);
    socketPrivate.emit('chatInit', {
      buyerId: state?.id,
      sellerId: product.userId,
      productId: product.id,
    })
    socketPrivate.on('private-chat-init', setChatListInit);
    return () => {
      socketPrivate.off('private-chat-init', setChatListInit);
    }
  }, []);

  useEffect(() => {
    const setChatList = (data: any) => {
      setChat((prev: any) => [...prev, {
        chat: data.chat,
        fromUserId: data.fromUserId,
        time: data.time,
      }]);
    }
    socketPrivate.on('private-chat', setChatList);
    return () => {
      socketPrivate.off('private-chat', setChatList);
    }
  }, []);
  
  const handleChatMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMsg(e.target.value);
  }

  const handleSandChat = ()  => {
    const time = dayjs();
    // 여기서 fromUserId와 toUserId는 서로 바뀜. 바꿔서 보내야함.
    socketPrivate.emit('privateChat', {
      chat: chatMsg,
      fromUserId: state?.id,
      toUserId: product.userId,
      productId: product.id,
      time: time,
    });
    setChat((prev: any) => [...prev, {
      chat: chatMsg,
      fromUserId: state?.id,
      time: time,
    }]);
    setChatMsg('');
  }

  const handleChatDelete = () => {
    socketPrivate.emit('exitRoom', {
      productId: product.id,
      fromUserId: state?.id,
      toUserId: product.userId,
    });
    handleModal();
  }

  return (
    <>
      <div className='absolute top-0 left-0 z-40 flex items-center justify-center w-screen h-screen bg-black opacity-30'></div>
      <div className='absolute left-0 z-50 flex justify-center w-screen top-48'>
        <div className='relative p-4 text-center bg-white border-2 rounded-lg w-120 border-sky text-sky'>
          <BiX className='absolute text-3xl cursor-pointer top-4 right-4 text-sky hover:text-red' onClick={handleModal}/>
          <p className='my-2 text-3xl'>채팅창</p>
          <p className='my-2 text-xl'>{product.title}</p>
          <div className='flex justify-center'>
            <span className='mr-4 text-gray'>{product.nickname}님과의 채팅</span>
            <div className='flex items-center text-green'>
              <BiMoney /><span className='ml-1'>{product.price} 원</span>
            </div>
          </div>
          <div className='flex flex-wrap justify-center'>
            <div className='p-4 my-4 overflow-auto border-2 rounded-lg w-108 h-128'>
              <span>채팅 내역</span>
              {chat.map((msg: IChat, i: number) => (
                <div>
                  {msg?.fromUserId === state?.id
                    ? <div key={i + msg.chat} className='p-2 text-right'>
                        <p >{msg?.chat}</p>
                        <span className='text-sm text-right text-gray'>{displayCreatedAt(msg?.time)}</span>
                      </div>
                    : <div key={i + msg.chat} className='p-2 text-left'>
                        <span className='text-sm text-gray'>{displayCreatedAt(msg?.time)}</span>
                        <p>{msg?.chat}</p>
                      </div>
                    }
                </div>
              ))}
            </div>
            <div className='relative'>
              <input className='p-4 my-2 border-2 rounded-lg w-108' placeholder='채팅을 입력하세요.' value={chatMsg} onChange={handleChatMsg}/>
              <button className='absolute p-2 text-white rounded-lg right-2 top-1/4 bg-sky' onClick={handleSandChat}>전송</button>
            </div>
            <div className='mt-4'>
              <button className='p-2 rounded-lg w-108 text-red hover:text-white hover:bg-red' onClick={handleChatDelete}>채팅 삭제하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(ChatModal);