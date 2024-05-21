import React from 'react';
import {
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CustomChannelHeader from "./CustomChannelHeader";
import { EmojiPicker } from 'stream-chat-react/emojis';

interface ChatChannelProps {
  show: boolean;
  hideChannelOnThread: boolean;
}

const WrappedChannel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Channel EmojiPicker={EmojiPicker}>{children}</Channel>;
};

const ChatChannel: React.FC<ChatChannelProps> = ({ show, hideChannelOnThread }) => {
  return (
    <div className={`h-full w-full ${show ? "block" : "hidden"}`}>
      <WrappedChannel>
        <Window hideOnThread={hideChannelOnThread}>
          <CustomChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </WrappedChannel>
    </div>
  );
};

export default ChatChannel;
