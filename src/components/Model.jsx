import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { rgbToHex } from "@/libs/hepler"

export default function Model({ model, meshes, setMeshes }) {
    const ref = useRef()
    const { nodes } = useGLTF(model.url)

    useEffect(() => {
        setMeshes(Object.keys(nodes).filter(key => nodes[key].type === "Mesh").map((key) => nodes[key]))
    }, [nodes, setMeshes])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
        ref.current.position.x = (1 + Math.sin(t / 1.5)) / 10
    })

    return (
        <>
            <group ref={ref}>
                {Object.keys(nodes).filter(key => nodes[key].type === "Mesh").map((node, index) => (
                    <mesh
                        key={index}
                        receiveShadow
                        castShadow
                        geometry={nodes[node].geometry}
                        material={nodes[node].material}
                        material-color={rgbToHex(nodes[node].material.color)} />
                ))}
            </group>
        </>
    )
}