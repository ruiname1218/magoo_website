import React, { useRef } from 'react'
import { OrbitControls, Environment, Float, ContactShadows, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import Magoo from './Magoo'

function BackgroundElements() {
    const group = useRef()
    useFrame((state) => {
        group.current.rotation.y += 0.001
        group.current.rotation.x += 0.001
    })

    return (
        <group ref={group}>
            <Float speed={1} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[-3, 2, -5]}>
                    <torusGeometry args={[0.5, 0.2, 16, 32]} />
                    <meshStandardMaterial color="#FF6B6B" />
                </mesh>
                <mesh position={[4, -1, -4]}>
                    <boxGeometry args={[0.8, 0.8, 0.8]} />
                    <meshStandardMaterial color="#FFE66D" />
                </mesh>
                <mesh position={[-2, -3, -2]}>
                    <sphereGeometry args={[0.4]} />
                    <meshStandardMaterial color="#4ECDC4" />
                </mesh>
                <mesh position={[3, 3, -6]}>
                    <octahedronGeometry args={[0.6]} />
                    <meshStandardMaterial color="#292F36" />
                </mesh>
            </Float>
        </group>
    )
}

function MagooScene() {
    const scroll = useScroll()
    const magooRef = useRef()
    const { width } = useThree((state) => state.viewport)
    const isMobile = width < 10 // Increased threshold to cover tablets (iPad)

    useFrame((state, delta) => {
        const offset = scroll.offset

        if (magooRef.current) {
            magooRef.current.rotation.y = Math.PI * 2 * offset

            if (isMobile) {
                // Mobile: Less horizontal movement, keep centered
                magooRef.current.position.x = 0
                magooRef.current.position.y = -0.5 // Lower slightly
            } else {
                // Desktop: Move side to side
                // Page 1 (0-0.25): Center -> Right
                // Page 2 (0.25-0.5): Right -> Left
                // Page 3 (0.5-0.75): Left -> Right (Video)
                // Page 4 (0.75-1.0): Right -> Center

                // Simple sine wave logic might need adjustment for 5 pages
                // 5 pages = 4 intervals. 
                // offset 0 = Page 1 start
                // offset 0.25 = Page 2 start
                // offset 0.5 = Page 3 start
                // offset 0.75 = Page 4 start (Video)
                // offset 1.0 = Page 5 start (CTA)

                // Let's use a custom curve or just sine with adjusted frequency
                // We want:
                // P1: Center
                // P2: Left (Text Right) -> x = -2.5
                // P3: Center (Text Center) -> x = 0 (or maybe slightly off if text is wide)
                // P4: Center (Video Center) -> x = 0 (Magoo behind or to side? Maybe side)
                // Let's try moving him to the Right for Video page

                // Increase amplitude to 3.5 to push him further out
                // Adjusted for 7 pages (more spacing for mobile)
                magooRef.current.position.x = -Math.sin(offset * Math.PI * 3) * 3.5
                magooRef.current.position.y = -1
            }
        }
    })

    return (
        <group ref={magooRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Magoo position={[0, 0, 0]} scale={isMobile ? 1.2 : 1.5} />
            </Float>
        </group>
    )
}

export default function Experience() {
    return (
        <>
            <color attach="background" args={['#F0F4F8']} />

            {/* Lights */}
            <ambientLight intensity={2.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={4} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#FF6B6B" />
            <pointLight position={[10, 5, 10]} intensity={2} color="#4ECDC4" />
            <directionalLight position={[0, 5, 5]} intensity={3} />
            {/* Dedicated Face Light - Front Fill */}
            <spotLight position={[0, 2, 6]} angle={0.5} penumbra={1} intensity={5} distance={10} color="#FFFFFF" />

            <BackgroundElements />

            <ScrollControls pages={7} damping={0.2}>
                {/* 3D Content */}
                <MagooScene />

                {/* HTML Content */}
                <Scroll html style={{ width: '100%' }}>
                    {/* Page 1: Hero */}
                    <section className="section-container">
                        <div className="hero-content">
                            <h1 className="hero-title">
                                未来の相棒、<br />
                                <span style={{ color: 'var(--color-primary)' }}>MAGOO</span>
                            </h1>
                            <p className="hero-subtitle">
                                レトロでポップなAIロボット。<br />あなたの孫がいつでもどこでも。
                            </p>
                            <button className="btn-secondary">
                                もっと知る
                            </button>
                        </div>
                        <div style={{ position: 'absolute', bottom: 32, right: 32, textAlign: 'right', display: 'none' }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)' }}>SCROLL TO EXPLORE</p>
                        </div>
                    </section>

                    {/* Page 2: Features */}
                    <section className="section-container features-section">
                        <div className="hero-content">
                            <h2 className="hero-title" style={{ color: 'var(--color-secondary)' }}>
                                レトロ<br />フューチャー
                            </h2>
                            <p className="hero-subtitle">
                                懐かしいけど、新しい。<br />
                                最先端AI搭載の雪だるまロボット。<br />
                                Magooは、過去と未来をつなぐ架け橋です。
                            </p>
                        </div>
                    </section>

                    {/* Page 3: Use Cases */}
                    <section className="section-container usecase-section" style={{ marginBottom: '20vh' }}>
                        <h2 className="usecase-title">
                            <span style={{ color: 'var(--color-accent)' }}>Magoo</span>のある生活
                        </h2>
                        <div className="usecase-grid">
                            <div className="usecase-card" style={{ boxShadow: '8px 8px 0px var(--color-primary)' }}>
                                <img src="/images/usecase1.png" alt="Use Case 1" style={{ width: '100%', borderRadius: 12, border: '2px solid var(--color-text)' }} />
                                <p style={{ marginTop: 16, fontWeight: 700, textAlign: 'center', color: 'var(--color-text)' }}>
                                    寂しい時も、<br />Magooがいてくれる。
                                </p>
                            </div>
                            <div className="usecase-card" style={{ boxShadow: '8px 8px 0px var(--color-secondary)' }}>
                                <img src="/images/usecase2.png" alt="Use Case 2" style={{ width: '100%', borderRadius: 12, border: '2px solid var(--color-text)' }} />
                                <p style={{ marginTop: 16, fontWeight: 700, textAlign: 'center', color: 'var(--color-text)' }}>
                                    まるで本当の孫のように。<br />AIだけど完璧じゃない。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Page 4: Video */}
                    <section className="section-container video-section">
                        <h2 className="usecase-title" style={{ fontSize: '3rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>Magoo</span> とおしゃべり
                        </h2>
                        <div className="video-container">
                            <video className="video-player" controls autoPlay loop muted playsInline>
                                <source src="/videos/magoo_concept.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </section>

                    {/* Page 5: CTA */}
                    <section className="section-container cta-section">
                        <div style={{ textAlign: 'center' }}>
                            <h2 className="hero-title" style={{ color: 'var(--color-primary)' }}>
                                準備はいい？
                            </h2>
                            <a
                                href="https://github.com/ruiname1218/magoo_companion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                style={{ fontSize: '1.8rem', textDecoration: 'none', display: 'inline-block' }}
                            >
                                Magooをお迎えする
                            </a>
                        </div>
                    </section>
                </Scroll>
            </ScrollControls>

            {/* Shadows */}
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#292F36" />

            {/* Environment Map for reflections */}
            <Environment preset="city" environmentIntensity={1.5} />
        </>
    )
}
