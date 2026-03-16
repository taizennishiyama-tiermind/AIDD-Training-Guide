import { NavLink, useLocation } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { motion } from 'framer-motion'
import { Home, X, Clock, Link as LinkIcon, Monitor } from 'lucide-react'
import claudeLogo from '../assets/Claude Logo.png'

interface SidebarProps {
  readonly onClose: () => void
  readonly collapsed: boolean
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <NavLink to="/" className="group flex items-center gap-2.5" onClick={onClose}>
          <img src={claudeLogo} alt="Claude" className="w-7 h-7" />
          <div>
            <div className="font-bold text-sm text-gray-900 tracking-tight">AI-Driven Dev</div>
            <div className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Training Guide</div>
          </div>
        </NavLink>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <NavLink
          to="/"
          onClick={onClose}
          end
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
              isActive
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`
          }
        >
          <Home className="w-3.5 h-3.5 shrink-0" />
          Overview
        </NavLink>

        <NavLink
          to="/setup"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all mt-2 ${
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`
          }
        >
          <Monitor className="w-3.5 h-3.5 shrink-0" />
          Ep.0 セットアップ
        </NavLink>

        <div className="mt-5 mb-2 px-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Chapters
          </span>
        </div>

        {chapters.filter(c => c.id <= 8).map((chapter) => {
          const isActive = location.pathname === `/chapter/${chapter.id}`

          return (
            <NavLink
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              onClick={onClose}
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all relative ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-primary-500"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className={`shrink-0 w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                isActive ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600'
              }`}>
                {chapter.id}
              </span>
              <span className="truncate">{chapter.title}</span>
              <span className="ml-auto text-[10px] text-gray-400 shrink-0 tabular-nums">{chapter.duration}</span>
            </NavLink>
          )
        })}

        <div className="mt-5 mb-2 px-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            番外編
          </span>
        </div>

        {chapters.filter(c => c.id >= 9).map((chapter) => {
          const isActive = location.pathname === `/chapter/${chapter.id}`

          return (
            <NavLink
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              onClick={onClose}
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all relative ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-bonus"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-primary-500"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className={`shrink-0 w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                isActive ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600'
              }`}>
                {chapter.id}
              </span>
              <span className="truncate">{chapter.title}</span>
              <span className="ml-auto text-[10px] text-gray-400 shrink-0 tabular-nums">{chapter.duration}</span>
            </NavLink>
          )
        })}

        <div className="mt-5 mb-2 px-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Resources
          </span>
        </div>
        <a
          href="/#timeline"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all"
        >
          <Clock className="w-3.5 h-3.5 shrink-0" />
          Timeline
        </a>
        <a
          href="/#resources"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all"
        >
          <LinkIcon className="w-3.5 h-3.5 shrink-0" />
          Reference Links
        </a>
      </nav>

      <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-2">
        <img src={claudeLogo} alt="" className="w-3.5 h-3.5 opacity-40" />
        <div className="text-[10px] text-gray-400">Powered by Claude Code</div>
      </div>
    </div>
  )
}
