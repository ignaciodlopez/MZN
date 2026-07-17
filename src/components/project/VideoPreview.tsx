import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface VideoPreviewProps {
  src: string;
  poster?: string;
  className?: string;
}

// Solo un preview reproduciéndose a la vez en toda la página.
let currentVideo: HTMLVideoElement | null = null;

export function VideoPreview({ src, poster, className }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const canHover = useMediaQuery("(pointer: fine) and (hover: hover)");
  const [failed, setFailed] = useState(false);

  const active = canHover && !prefersReducedMotion && !failed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      if (currentVideo === video) currentVideo = null;
    };
  }, []);

  const play = () => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo && currentVideo !== video) {
      currentVideo.pause();
    }
    currentVideo = video;
    video.play().catch(() => setFailed(true));
  };

  const pause = () => {
    videoRef.current?.pause();
  };

  if (failed && poster) {
    return <img src={poster} alt="" className={className} loading="lazy" decoding="async" />;
  }

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      onMouseEnter={play}
      onMouseLeave={pause}
      onError={() => setFailed(true)}
      className={className}
    >
      <source src={src} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}
