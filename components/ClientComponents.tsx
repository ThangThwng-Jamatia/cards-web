'use client';

import dynamic from 'next/dynamic';
import GlobalBackground from '@/components/GlobalBackground';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });

export default function ClientComponents() {
  return (
    <>
      <GlobalBackground />
      <LoadingScreen />
      <CustomCursor />
    </>
  );
}
