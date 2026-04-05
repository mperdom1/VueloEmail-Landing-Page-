import React from 'react';

export const VideoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 w-full h-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-30 grayscale"
        poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
      >
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-background-32986-large.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
    </div>
  );
};
