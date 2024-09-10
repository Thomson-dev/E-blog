import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar/>
      <section>{children}</section>
      <Footer/>
    </div>
  );
}