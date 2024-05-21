"use client"

import { UserButton, useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat';
import { ChannelHeader, ChannelList, Chat, LoadingIndicator, Streami18n, } from 'stream-chat-react';
import useInitializeChatClient from './useInitializeChatClient';
import MenuBar from './MenuBar';
import ChatSidebar from './ChatSidebar';
import ChatChannel from './ChatChannel';
import { Menu, X } from 'lucide-react';
import Button from '@/components/Button';
import useWindowSize from '@/hooks/useWindowSize';
import { mdBreakpoint } from '@/utils/tailwind';
import { useTheme } from '../ThemeProvider';

const i18Instance = new Streami18n({ language: "en",  });

const ChatPage = () => {
  // const { userId } = auth();

  // if(!userId) redirect("/sign-in")
  const { theme } = useTheme();
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) setChatSidebarOpen(false);
  }, [windowSize.width]);

  const handleSidebarOnClose = useCallback(() => {
    setChatSidebarOpen(false);
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <LoadingIndicator size={40} />
      </div>
    );
  }
  

  return (
    <div className="h-screen bg-gray-100 text-black dark:bg-black dark:text-white xl:px-20 xl:py-8">
      <div className="m-auto flex h-full min-w-[350px] max-w-[1600px] flex-col shadow-sm">
        <Chat 
          client={chatClient}
          i18nInstance={i18Instance}
          theme={
            theme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"
          }  
        >
        <div className="flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
              <Button onClick={() => setChatSidebarOpen(!chatSidebarOpen)}>
                {!chatSidebarOpen ? (
                  <span className="flex items-center gap-1">
                    <Menu /> Menu
                  </span>
                ) : (
                  <X />
                )}
              </Button>
            </div>
          <div className=' flex flex-row h-full overflow-y-auto'>
            <ChatSidebar 
              user={user} 
              show={isLargeScreen || chatSidebarOpen} 
              onClose={handleSidebarOnClose}
            />
            <ChatChannel show={isLargeScreen || !chatSidebarOpen} hideChannelOnThread={!isLargeScreen} />
          </div>
        </Chat>
      </div>
    </div>
  )
}

export default ChatPage
