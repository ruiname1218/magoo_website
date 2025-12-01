import React from 'react'
import { motion } from 'framer-motion'

export default function Overlay() {
    return (
        <div className="ui-overlay">
            <header style={{ position: 'absolute', top: 32, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text)' }}>
                    MAGOO
                </div>
                <nav className="header-nav">
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 700 }}>機能</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 700 }}>Magooとは</a>
                    <button className="btn-primary" style={{ fontSize: '1rem', padding: '10px 20px' }}>
                        予約する
                    </button>
                </nav>
            </header>
        </div>
    )
}
