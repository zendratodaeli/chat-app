import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const ChatPage = () => {
  const { userId } = auth();
  
  if(!userId) redirect("/sign-in")

  return (
    <div>
      Chat Page
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default ChatPage
