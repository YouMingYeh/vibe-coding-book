'use client'
import Link from 'next/link'
import React from 'react'
import { ThemeSwitcher } from './theme-switcher'
import { LanguageSwitcher } from './language-switcher'

const menuItems = [
    { name: 'Build a Website', href: '/web' },
    { name: 'Build an iOS App', href: '/ios' },
]

export const Header = () => {
    const [isVisible, setIsVisible] = React.useState(true)
    const [lastScrollY, setLastScrollY] = React.useState(0)

    React.useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY
            
            if (currentScrollY < 10) {
                setIsVisible(true)
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true)
            }
            
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', controlHeader)
        return () => window.removeEventListener('scroll', controlHeader)
    }, [lastScrollY])

    return (
        <header
            className={`fixed z-50 w-full transition-transform duration-300 ease-in-out ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <nav className="bg-background/95 backdrop-blur-sm">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="flex items-center justify-between py-6">
                        <div className="flex items-center gap-16">
                            <Link
                                href="/"
                                aria-label="home"
                                className="text-lg font-medium text-foreground hover:text-foreground/80 transition-colors"
                            >
                                Vibe Coding Book
                            </Link>
                            <div className="hidden md:flex md:gap-x-8">
                                {menuItems.map((item) => (
                                    <Link 
                                        key={item.name} 
                                        href={item.href} 
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <ThemeSwitcher />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
