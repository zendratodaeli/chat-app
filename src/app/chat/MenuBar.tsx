import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { Users } from "lucide-react"

interface MenuBarProps {
  onUserMenuClick: () => void;
}

const MenuBar = ({ onUserMenuClick }: MenuBarProps) => {
  return (
    <div className="flex items-center justify-between gap-3 border-e border-e-[#DBDDE1] bg-white p-3 dark:border-e-gray-800 dark:bg-[#17191c]">
      <UserButton afterSignOutUrl='/'/>
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick} />
        </span>
      </div>
    </div>
  )
}

export default MenuBar
