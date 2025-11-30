import React, { useRef } from 'react'
import { OrbitControls, Environment, Float, ContactShadows, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
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

    useFrame((state, delta) => {
        const offset = scroll.offset

        // Rotate Magoo based on scroll
        // Page 1: Front facing
        // Page 2: Rotated 180 degrees
        // Page 3: Front facing again

        if (magooRef.current) {
            magooRef.current.rotation.y = Math.PI * 2 * offset
            // Invert sine to move Left on Page 2 (offset ~0.33) where text is Right
            magooRef.current.position.x = -Math.sin(offset * Math.PI * 2) * 2.5
        }
    })

    return (
        <group ref={magooRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Magoo position={[0, -1, 0]} scale={1.5} />
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

            <ScrollControls pages={4} damping={0.2}>
                {/* 3D Content */}
                <MagooScene />

                {/* HTML Content */}
                <Scroll html style={{ width: '100%' }}>
                    {/* Page 1: Hero */}
                    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '10vw' }}>
                        <div style={{ maxWidth: 600 }}>
                            <h1 style={{ fontSize: '5rem', lineHeight: 1.1, marginBottom: 24, color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                                未来の相棒、<br />
                                <span style={{ color: 'var(--color-primary)' }}>MAGOO</span>
                            </h1>
                            <p style={{ fontSize: '1.25rem', color: 'var(--color-text)', opacity: 0.8, marginBottom: 32, fontWeight: 700 }}>
                                レトロでポップなAIロボット。<br />あなたの孫がいつでもどこでも。
                            </p>
                            <button style={{
                                background: 'var(--color-text)',
                                color: 'white',
                                border: 'none',
                                padding: '16px 32px',
                                borderRadius: '50px',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontFamily: 'var(--font-heading)',
                                letterSpacing: '0.05em'
                            }}>
                                もっと知る
                            </button>
                        </div>
                        <div style={{ position: 'absolute', bottom: 32, right: 32, textAlign: 'right' }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)' }}>SCROLL TO EXPLORE</p>
                        </div>
                    </section>

                    {/* Page 2: Features */}
                    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10vw' }}>
                        <div style={{ maxWidth: 500, textAlign: 'right' }}>
                            <h2 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: 24, color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>
                                レトロ<br />フューチャー
                            </h2>
                            <p style={{ fontSize: '1.25rem', color: 'var(--color-text)', opacity: 0.8, marginBottom: 32, fontWeight: 700 }}>
                                懐かしいけど、新しい。<br />
                                最先端AI搭載の雪だるまロボット。<br />
                                Magooは、過去と未来をつなぐ架け橋です。
                            </p>
                        </div>
                    </section>

                    {/* Page 3: Use Cases */}
                    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: 48, color: 'var(--color-text)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>
                            <span style={{ color: 'var(--color-accent)' }}>Magoo</span>のある生活
                        </h2>
                        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', padding: '0 20px' }}>
                            <div style={{
                                width: 400,
                                background: 'white',
                                padding: 16,
                                borderRadius: 20,
                                boxShadow: '8px 8px 0px var(--color-primary)',
                                border: '4px solid var(--color-text)'
                            }}>
                                <img src="/images/usecase1.png" alt="Use Case 1" style={{ width: '100%', borderRadius: 12, border: '2px solid var(--color-text)' }} />
                                <p style={{ marginTop: 16, fontWeight: 700, textAlign: 'center', color: 'var(--color-text)' }}>
                                    寂しい時も、<br />Magooがいてくれる。
                                </p>
                            </div>
                            <div style={{
                                width: 400,
                                background: 'white',
                                padding: 16,
                                borderRadius: 20,
                                boxShadow: '8px 8px 0px var(--color-secondary)',
                                border: '4px solid var(--color-text)'
                            }}>
                                <img src="/images/usecase2.png" alt="Use Case 2" style={{ width: '100%', borderRadius: 12, border: '2px solid var(--color-text)' }} />
                                <p style={{ marginTop: 16, fontWeight: 700, textAlign: 'center', color: 'var(--color-text)' }}>
                                    まるで本当の孫のように。<br />AIだけど完璧じゃない。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Page 4: CTA */}
                    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: 24, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                                準備はいい？
                            </h2>
                            <button style={{
                                background: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                padding: '20px 40px',
                                borderRadius: '50px',
                                fontSize: '1.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
                                fontFamily: 'var(--font-heading)',
                                letterSpacing: '0.05em'
                            }}>
                                Magooをお迎えする
                            </button>
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
