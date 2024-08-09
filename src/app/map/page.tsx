'use client'; // 이 줄을 꼭 추가해야 합니다.

import dynamic from 'next/dynamic';

const WorldMap = dynamic(() => import('../../components/WorldMap'), { ssr: false });

export default function MapPage() {
  return <WorldMap />;
}