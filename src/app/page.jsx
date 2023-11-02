"use client";

import ThreeViewer from "@/components/ThreeViewer";
import { useEffect, useState } from "react";

import modelsDami from '@/mocks/models.json';
import Image from "next/image";
import { hexToRgb, rgbToHex, rgbaToHex, hexToRgba } from "@/libs/hepler";

export default function Home() {
  const [model, setModel] = useState(null);
  const [models, setModels] = useState(null);
  const [meshes, setMeshes] = useState(null);
  const [selectedMesh, setSelectedMesh] = useState(null);

  useEffect(() => {
    setModels(modelsDami);
  }, []);

  const handleChangeColor = (e) => {
    selectedMesh.material.color = { ...selectedMesh.material.color, ...hexToRgba(e.target.value) }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>3d model viewer</h1>
      <div className="w-full flex justify-between mb-14">
        {models && (
          <div>
            <p>Select a model</p>
            <select className="border" defaultValue={model?.id} onChange={(e) => setModel(models.find((model) => model.id === e.target.value) ?? null)}>
              <option value="">Select a model</option>
              {models.map((model) => (
                <option key={model.id} value={model.id} className="flex items-center gap-8">
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {meshes && (
          <div>
            <p>Select a mesh</p>
            <select className="border" defaultValue={selectedMesh?.id} onChange={(e) => setSelectedMesh(meshes.find((mesh) => mesh.name === e.target.value) ?? null)}>
              <option value="">Select a mesh</option>
              {meshes.map((mesh) => (
                <option key={mesh.name} value={mesh.name}>
                  {mesh.name}
                </option>
              ))}
            </select>
            {selectedMesh && (
              <div className="flex gap-4">
                <label htmlFor="material-color">Material color</label>
                <input id="material-color" type="color" onChange={handleChangeColor}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <ThreeViewer model={model} meshes={meshes} setMeshes={setMeshes} />
    </main>
  )
}
