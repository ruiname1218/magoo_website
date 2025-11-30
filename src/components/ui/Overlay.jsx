import React from 'react'
import { motion } from 'framer-motion'

export default function Overlay() {
    return (
        <div className="ui-overlay">
            <header style={{ position: 'absolute', top: 32, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text)' }}>
                    MAGOO
                </div>
                <nav style={{ display: 'flex', gap: 32 }}>
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 700 }}>機能</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 700 }}>Magooとは</a>
                    <button style={{
                        background: 'var(--color-primary)',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        color: 'white',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(255, 107, 107, 0.4)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.1rem',
                        letterSpacing: '0.05em'
                    }}>
                        予約する
                    </button>
                </nav>
            </header>
        </div>
    )
}
