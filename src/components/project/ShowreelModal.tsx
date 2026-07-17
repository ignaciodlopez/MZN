import { X } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { site } from "@/data/site";
import { withBasePath } from "@/lib/paths";

interface ShowreelModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ open, onClose }: ShowreelModalProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Modal open={open} onClose={onClose} label={site.showreel.title} panelClassName="max-w-5xl">
      <div className="flex items-center justify-between pb-4">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
          {site.showreel.title}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex min-h-11 min-w-11 items-center justify-center text-foreground transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <X aria-hidden="true" className="h-6 w-6" />
          <span className="sr-only">Cerrar showreel</span>
        </button>
      </div>

      <div className="relative aspect-video w-full overflow-hidden border border-line bg-surface">
        {failed ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 bg-cover bg-center p-8 text-center"
            style={{ backgroundImage: `url(${withBasePath(site.showreel.poster)})` }}
          >
            <p className="bg-background/80 px-4 py-2 text-sm text-foreground">
              El showreel todavía no está disponible.
            </p>
            <p className="bg-background/80 px-4 py-2 text-xs text-muted">
              Agregá tu video en <code>public/videos/showreel/showreel.mp4</code>
            </p>
          </div>
        ) : (
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster={withBasePath(site.showreel.poster)}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          >
            <source
              src={withBasePath(site.showreel.videoSrc)}
              type="video/mp4"
              onError={() => setFailed(true)}
            />
            Tu navegador no puede reproducir este video.
          </video>
        )}
      </div>
    </Modal>
  );
}
