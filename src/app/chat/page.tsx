"use client"

import { UserButton, useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import { StreamChat } from 'stream-chat';
import { Channel, ChannelHeader, ChannelList, Chat, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import useInitializeChatClient from './useInitializeChatClient';

const ChatPage = () => {
  // const { userId } = auth();

  // if(!userId) redirect("/sign-in")
  
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <LoadingIndicator size={40} />
      </div>
    );
  }
  

  return (
    <div className="h-screen bg-gray-100 text-black dark:bg-black dark:text-white xl:px-20 xl:py-8">
      <UserButton afterSignOutUrl='/'/>
      <Chat client={chatClient}>
        <div className=' flex flex-row h-full'>
          <div className=' w-full max-w-[360px]'>
            <ChannelList
              filters={{
                type: "messaging",
                members: {$in: [user.id]}
              }}
              sort={{last_message_at: -1}}
              options={{state: true, presence: true, limit: 10}}
              />
          </div>
          <div className=' h-full w-full'>
            <Channel>
              <Window>
                <ChannelHeader/>
                <MessageList/>
                <MessageInput/>
              </Window>
              <Thread/>
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  )
}

export default ChatPage
