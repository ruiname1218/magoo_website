import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function Magoo(props) {
    const group = useRef()
    const { scene } = useGLTF('/magoo.glb')

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Organic Floating Animation
        // Vertical movement (Bobbing)
        group.current.position.y = Math.sin(t * 1) * 0.1 + Math.sin(t * 2.5) * 0.02

        // Gentle Rotation (Y-axis)
        group.current.rotation.y = Math.sin(t * 0.3) * 0.2

        // Subtle Tilting (Z-axis - swaying side to side)
        group.current.rotation.z = Math.sin(t * 0.8) * 0.05

        // Subtle Pitching (X-axis - nodding slightly)
        group.current.rotation.x = Math.sin(t * 1.2) * 0.02
    })

    return (
        <group ref={group} {...props}>
            {/* Increased scale from default (1) to 2.5 for larger presence */}
            <primitive object={scene} scale={2.5} />
        </group>
    )
}

useGLTF.preload('/magoo.glb')
