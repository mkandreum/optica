import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, ShieldAlert, Loader2 } from 'lucide-react';
import Webcam from 'react-webcam';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import * as tfjs from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-converter';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

interface ARViewProps {
  product: Product;
  onBack: () => void;
}

export function ARView({ product, onBack }: ARViewProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [detector, setDetector] = useState<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
  
  const webcamRef = useRef<Webcam>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [glassesTransform, setGlassesTransform] = useState({
    x: 0, y: 0, width: 200, angle: 0, opacity: 0
  });

  const handleUserMedia = () => setHasPermission(true);
  const handleUserMediaError = () => setHasPermission(false);

  useEffect(() => {
    let active = true;
    const initDetector = async () => {
      try {
        await tfjs.setBackend('webgl');
        await tfjs.ready();
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
          runtime: 'tfjs' as const,
          refineLandmarks: false,
        };
        const newDetector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        if (active) {
            setDetector(newDetector);
            setModelLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (active) setModelLoading(false);
      }
    };
    initDetector();
    return () => { active = false; };
  }, []);

  const detectFace = useCallback(async () => {
    if (!detector || !webcamRef.current || !webcamRef.current.video || !containerRef.current) {
        requestAnimationFrame(detectFace);
        return;
    }
    
    const video = webcamRef.current.video;
    if (video.readyState !== 4) {
        requestAnimationFrame(detectFace);
        return;
    }

    try {
        const faces = await detector.estimateFaces(video, { flipHorizontal: true });
        
        if (faces.length > 0) {
            const face = faces[0];
            const keypoints = face.keypoints;
            
            // Outer eyes corners in MediaPipe Face Mesh
            const leftEye = keypoints[33];
            const rightEye = keypoints[263];
            
            if (leftEye && rightEye) {
                const dx = rightEye.x - leftEye.x;
                const dy = rightEye.y - leftEye.y;
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const distance = Math.sqrt(dx*dx + dy*dy);
                
                // Glasses width based on eye distance
                const glassesWidth = distance * 2.3;
                
                // Center point
                const videoCx = (leftEye.x + rightEye.x) / 2;
                const videoCy = (leftEye.y + rightEye.y) / 2;
                
                // Display aspect ratio mapping
                const videoScaleX = containerRef.current.clientWidth / video.videoWidth;
                const videoScaleY = containerRef.current.clientHeight / video.videoHeight;
                const scale = Math.max(videoScaleX, videoScaleY);
                
                const renderedWidth = video.videoWidth * scale;
                const renderedHeight = video.videoHeight * scale;
                const offsetX = (containerRef.current.clientWidth - renderedWidth) / 2;
                const offsetY = (containerRef.current.clientHeight - renderedHeight) / 2;
                
                const cx = (videoCx * scale) + offsetX;
                
                // Slight Y adjustment to sit on the bridge of the nose
                const cy = (videoCy * scale) + offsetY - (glassesWidth * 0.05);
                
                setGlassesTransform({
                    x: cx,
                    y: cy,
                    width: glassesWidth * scale,
                    angle: angle,
                    opacity: 1
                });
            }
        } else {
            setGlassesTransform(prev => ({ ...prev, opacity: 0 }));
        }
    } catch (e) {
      // Avoid spamming logs for occasional detection failures
    }
    
    requestAnimationFrame(detectFace);
  }, [detector]);

  useEffect(() => {
    let id: number;
    if (hasPermission && detector) {
        id = requestAnimationFrame(detectFace);
    }
    return () => {
        if (id) cancelAnimationFrame(id);
    };
  }, [hasPermission, detector, detectFace]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute inset-0 z-50 bg-[#1A1A1A] text-[#F9F9F7] min-h-[100dvh] overflow-hidden flex flex-col font-sans select-none"
    >
      {/* Header Overlay */}
      <header className="absolute top-0 inset-x-0 px-12 py-8 flex items-center justify-between z-10 pointer-events-auto">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white text-white hover:text-black transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
        </button>
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          AR Scan Activo
        </div>
      </header>

      {/* Webcam Backing */}
      <div ref={containerRef} className="relative flex-1 w-full flex items-center justify-center bg-[#1A1A1A] overflow-hidden">
        <Webcam
          ref={webcamRef}
          audio={false}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
          videoConstraints={{ facingMode: "user" }}
          mirrored={true}
        />

        {/* Neural Net Tracker Line / Loader */}
        {modelLoading && hasPermission === true && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <Loader2 className="text-white/50 w-8 h-8 mb-4 animate-spin" strokeWidth={1.5} />
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-70">Cargando Red Neuronal...</p>
          </div>
        )}

        {/* Real-time AR Overlay */}
        {hasPermission === true && !modelLoading && (
          <div className="absolute inset-0 z-10 pointer-events-none">
             {/* 2D Smart Representation of the glasses, synced to face */}
             <div 
               className="absolute top-0 left-0 flex items-center justify-center gap-[6%] transition-all duration-75 ease-out"
               style={{
                 transform: `translate(${glassesTransform.x - (glassesTransform.width / 2)}px, ${glassesTransform.y - (glassesTransform.width * 0.15)}px) rotate(${glassesTransform.angle}deg)`,
                 width: `${glassesTransform.width}px`,
                 height: `${glassesTransform.width * 0.3}px`,
                 opacity: glassesTransform.opacity,
                 filter: 'drop-shadow(0 20px 10px rgba(0,0,0,0.5))'
               }}
             >
                {/* Left Lens */}
                <div style={{ borderColor: product.color }} className="w-[44%] h-[100%] border-[4px] rounded-[30%] opacity-90 shadow-inner mix-blend-plus-lighter relative">
                   <div style={{ backgroundColor: product.glassColor, opacity: 0.6 }} className="absolute inset-0 rounded-[28%] mix-blend-screen"></div>
                </div>
                {/* Bridge */}
                <div style={{ backgroundColor: product.color }} className="w-[8%] h-[10%] opacity-90 shadow-inner mix-blend-plus-lighter rounded-sm absolute top-[45%] left-[46%] z-10" />
                {/* Right Lens */}
                <div style={{ borderColor: product.color }} className="w-[44%] h-[100%] border-[4px] rounded-[30%] opacity-90 shadow-inner mix-blend-plus-lighter relative">
                   <div style={{ backgroundColor: product.glassColor, opacity: 0.6 }} className="absolute inset-0 rounded-[28%] mix-blend-screen"></div>
                </div>
             </div>

             {/* Out of bound / Lost tracking indicator */}
             {glassesTransform.opacity === 0 && detector && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                 <div className="w-64 h-80 border-[0.5px] border-dashed border-white/20 flex items-center justify-center relative">
                    <div className="absolute top-0 left-0 w-4 h-[1px] bg-white/50"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-4 bg-white/50"></div>
                    <div className="absolute top-0 right-0 w-4 h-[1px] bg-white/50"></div>
                    <div className="absolute top-0 right-0 w-[1px] h-4 bg-white/50"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-white/50"></div>
                    <div className="absolute bottom-0 left-0 w-[1px] h-4 bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-white/50"></div>
                 </div>
                 <div className="absolute bottom-32 text-center">
                     <p className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-50 mb-2">Alinee el rostro</p>
                 </div>
               </div>
             )}
          </div>
        )}

        {hasPermission === false && (
          <div className="absolute flex flex-col items-center justify-center text-center p-8">
            <ShieldAlert className="text-white/30 w-10 h-10 mb-4" strokeWidth={1} />
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-80 mb-2">Se requiere cámara</p>
            <p className="text-[10px] opacity-40 uppercase tracking-widest max-w-[200px] leading-relaxed">Habilite el acceso a la cámara para la prueba virtual.</p>
          </div>
        )}

        {hasPermission === null && (
          <div className="absolute flex flex-col items-center justify-center text-center">
            <Camera className="text-white/30 w-8 h-8 mb-6 animate-pulse" strokeWidth={1} />
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-50">Iniciando Cámara</p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="absolute bottom-0 inset-x-0 pb-12 flex flex-col items-center justify-center z-10 pointer-events-auto">
         <button className="w-16 h-16 border border-white/30 rounded-full flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md active:scale-90 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
               <div className="w-4 h-4 rounded-full border border-[#1A1A1A]"></div>
            </div>
         </button>
      </div>
    </motion.div>
  );
}
