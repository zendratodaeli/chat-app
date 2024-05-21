import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { Moon, Sun, Users } from "lucide-react"
import { useTheme } from '../ThemeProvider';
import { dark } from "@clerk/themes";

interface MenuBarProps {
  onUserMenuClick: () => void;
}

const MenuBar = ({ onUserMenuClick }: MenuBarProps) => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between gap-3 border-e border-e-[#DBDDE1] bg-white p-3 dark:border-e-gray-800 dark:bg-[#17191c]">
      <UserButton afterSignOutUrl='/' appearance={{ baseTheme: theme === "dark" ? dark : undefined }}/>
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick} />
        </span>
        <ThemeToggleButton/>
      </div>
    </div>
  )
}

export default MenuBar

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  if (theme === "dark") {
    return (
      <span title="Enable light theme">
        <Moon className="cursor-pointer" onClick={() => setTheme("light")} />
      </span>
    );
  }

  return (
    <span title="Enable dark theme">
      <Sun className="cursor-pointer" onClick={() => setTheme("dark")} />
    </span>
  );
}
