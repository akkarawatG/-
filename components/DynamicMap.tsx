"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ComposableMap, ZoomableGroup } from "react-simple-maps";
import { geoIdentity, geoPath } from "d3-geo";
import { feature } from "topojson-client"; 

interface DynamicMapProps {
  countryCode: string;
  visitedList: string[];
  selectedRegionName: string | null;
  onRegionClick: (regionName: string) => void;
}

export default function DynamicMap({ 
  countryCode, 
  visitedList, 
  selectedRegionName, 
  onRegionClick 
}: DynamicMapProps) {
  
  const [geoData, setGeoData] = useState<any>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // State สำหรับ Loading และ Error
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // เพิ่ม State เก็บว่าเมาส์ชี้ตัวไหนอยู่
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Config Map
  const [mapConfig, setMapConfig] = useState({ scale: 1, offset: [0, 0] as [number, number] });

  useEffect(() => {
    const fetchMap = async () => {
      setIsLoading(true);
      setErrorMsg(null); // Reset error
      setGeoData(null);

      try {
        let code = countryCode.toLowerCase().trim();
        
        // 🔧 แก้ไขรหัสประเทศให้ตรงกับ Highcharts
        const codeMap: Record<string, string> = {
            'uk': 'gb',
            'usa': 'us',
            'uae': 'ae',
            // เพิ่มประเทศอื่นๆ ที่มีปัญหาได้ที่นี่
        };
        if (codeMap[code]) code = codeMap[code];

        const url = `https://code.highcharts.com/mapdata/countries/${code}/${code}-all.topo.json`;
        console.log(`Fetching Map: ${url}`);

        const response = await fetch(url);
        
        // 🚨 เช็ค Error จากการโหลด
        if (!response.ok) {
            throw new Error(`ไม่พบข้อมูลแผนที่สำหรับรหัส "${code}" (${response.status})`);
        }
        
        const topology = await response.json();
        
        // หา Key ข้อมูล
        let objectKey = Object.keys(topology.objects)[0];
        for (const key in topology.objects) {
            if (topology.objects[key].geometries) {
                objectKey = key;
                break;
            }
        }
        
        const geojson = feature(topology, topology.objects[objectKey]);

        // คำนวณ Scale (Auto-fit)
        const width = 800;
        const height = 600;
        const projection = geoIdentity().reflectY(true).fitSize([width, height], geojson as any);
        
        setMapConfig({
            scale: projection.scale(),
            offset: [projection.translate()[0], projection.translate()[1]]
        });

        setGeoData(geojson);

      } catch (err: any) {
        console.error("Map Error:", err);
        setErrorMsg(err.message || "เกิดข้อผิดพลาดในการโหลดแผนที่");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMap();
  }, [countryCode]);

  const pathGenerator = useMemo(() => {
     if (!mapConfig.scale) return null;
     const projection = geoIdentity().reflectY(true).scale(mapConfig.scale).translate(mapConfig.offset);
     return geoPath().projection(projection);
  }, [mapConfig]);

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePos({ x: event.clientX, y: event.clientY - 40 });
  };

  // 🔴 1. แสดง Error ถ้าโหลดไม่สำเร็จ
  if (errorMsg) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 rounded-xl border border-red-200 text-red-500 p-6 text-center">
         <div className="text-3xl mb-2">⚠️</div>
         <h3 className="font-bold text-lg">โหลดแผนที่ล้มเหลว</h3>
         <p className="text-sm opacity-80">{errorMsg}</p>
         <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-lg text-sm hover:bg-red-50 transition"
         >
            ลองใหม่
         </button>
      </div>
    );
  }

  // 🟡 2. แสดง Loading
  if (isLoading || !geoData || !pathGenerator) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl text-gray-400 animate-pulse border border-gray-200">
         <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-3"></div>
         <span className="text-xs">กำลังโหลดแผนที่...</span>
      </div>
    );
  }

  const features = geoData.type === 'FeatureCollection' ? geoData.features : [geoData];

  return (
    <div 
      className="w-full h-full bg-gray-100 rounded-xl overflow-hidden relative flex items-center justify-center border border-gray-200"
      onMouseMove={handleMouseMove}
    >
      <ComposableMap
        width={800} height={600}
        className="w-full h-full"
        style={{ maxHeight: "80vh", maxWidth: "100%" }}
        projectionConfig={{}} 
      >
        <ZoomableGroup center={[400, 300]} minZoom={0.5} maxZoom={4} translateExtent={[[0, 0], [800, 600]]}> 
          <g>
            {features.map((geo: any, index: number) => {
                const regionName = geo.properties["name"] || geo.properties["NAME_1"] || "Unknown";

                const isVisited = visitedList.includes(regionName);
                const isSelected = selectedRegionName === regionName;
                const isHovered = hoveredRegion === regionName;

                const pathData = pathGenerator(geo) || undefined;

                // 🎨 คำนวณสี
                let fillColor = "#E5E7EB"; // Default Gray
                
                if (isSelected) {
                    fillColor = isHovered ? "#1D4ED8" : "#3B82F6"; // ฟ้า
                } else if (isVisited) {
                    fillColor = isHovered ? "#DB2777" : "#F472B6"; // ชมพู
                } else {
                    fillColor = isHovered ? "#9CA3AF" : "#E5E7EB"; // เทา
                }

                const strokeWidth = isHovered ? 1.5 : 0.5;
                const zIndex = isHovered ? 10 : 1;

                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth={strokeWidth}
                    style={{ 
                        transition: "fill 0.2s ease, stroke-width 0.2s ease", 
                        cursor: "pointer", 
                        outline: "none",
                        position: 'relative',
                        zIndex: zIndex
                    }}
                    
                    onClick={() => onRegionClick(regionName)}
                    onMouseEnter={() => {
                        setTooltipContent(regionName);
                        setHoveredRegion(regionName);
                    }}
                    onMouseLeave={() => {
                        setTooltipContent("");
                        setHoveredRegion(null);
                    }}
                  />
                );
            })}
          </g>
        </ZoomableGroup>
      </ComposableMap>
      
      {tooltipContent && (
         <div 
            className="fixed bg-gray-900/95 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-xl pointer-events-none z-50 backdrop-blur-md border border-white/10"
            style={{ left: mousePos.x, top: mousePos.y, transform: 'translateX(-50%) translateY(-120%)' }}
         >
            {tooltipContent}
         </div>
      )}
    </div>
  );
}