import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { io } from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import {toast, Toaster} from 'react-hot-toast'

function Chat() {
    const [chats, setChats] = useState([])
    const [socket, setSocket] = useState(null)
    const [messageData, setMessageData] = useState('')
    const societyName = localStorage.getItem('societyName')
    const userId = localStorage.getItem('userId')
    const admin = JSON.parse(localStorage.getItem('admin'))
    const [error, setError] = useState('')

    const lastMessage = useRef(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000')
        setSocket(newSocket)

        newSocket.on('connect', () => {
            console.log('User connected', newSocket.id);
        })

        newSocket.on('disconnect', () => {
            console.log('User disconnected');
        })

        newSocket.emit('join', societyName)

        newSocket.on('messageHistory', (messageHistory) => {
            setChats(messageHistory)
        })

        newSocket.on('receiveMessage', (messageData) => {
            setChats((prevChats) => [...prevChats, messageData])
        })

        newSocket.on('error', (error) => {
            setError(error);
        })

        return () => {
            newSocket.disconnect();
        }
    }, [])

    useEffect(() => {
        if (lastMessage.current) {
            lastMessage.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [chats])


    const handleClick = () => {
        const message = {
            content: messageData,
            createdBy: userId,
            societyName: societyName
        };

        socket.emit('send-message', message);

        setMessageData('');
    }

    const handleClearChat = async() => {
        socket.emit('delete-message', societyName)
        toast.success('Message deleted successfully')
        window.location.reload()
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    return (
        <div className="chat-container">
            <div className="chat-main-container">
                <div className="chat-title-container">
                    <span>Chats</span>
                </div>
                <div className="chat-display-container">
                    {
                        chats && chats.length > 0 ? (
                            chats.map((chat, index) => {
                                const isLastMessage = index === chats.length - 1;
                                return (
                                    <div className={chat.createdBy === `${userId}` ? "chat-content-container-sender" : "chat-content-container-receiver"}
                                        key={chat._id}
                                        ref={isLastMessage ? lastMessage : null}>
                                        <span className='chat-content'>{chat.content}</span>
                                        <span className='chat-time'>{moment(chat.createdAt).format('LLL')}</span>
                                    </div>
                                )
                            }))
                            :
                            <div></div>
                    }
                </div>
                <div className="chat-input-container">
                    {
                        admin === true ?
                        <button className='clear-chat-button' onClick={handleClearChat}>Clear Chats</button>
                        :
                        <></>
                    }
                    <input type="text" placeholder='Write Something...' value={messageData} onChange={(e) => setMessageData(e.target.value)} onKeyDown={handleKeyDown}/>
                    <button onClick={handleClick}><FontAwesomeIcon icon={faPaperPlane} /></button>
                    <Toaster/>
                </div>
            </div>
        </div>
    )
}

export default Chat