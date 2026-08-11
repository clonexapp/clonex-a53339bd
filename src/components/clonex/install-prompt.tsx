import { Download, Share, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useDialogBehavior } from "@/hooks/use-dialog-behavior";

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const SEEN_KEY = "clonex:install-prompt-seen:v1";

export function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [nativePrompt, setNativePrompt] = useState<InstallPromptEvent | null>(null);
  const isIos = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    if (!standalone && !window.localStorage.getItem(SEEN_KEY)) setVisible(true);
    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setNativePrompt(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", capturePrompt);
    return () => window.removeEventListener("beforeinstallprompt", capturePrompt);
  }, []);

  function finish() {
    window.localStorage.setItem(SEEN_KEY, "true");
    setVisible(false);
  }

  async function install() {
    if (!nativePrompt) {
      finish();
      return;
    }
    await nativePrompt.prompt();
    await nativePrompt.userChoice;
    finish();
  }

  useDialogBehavior(finish, visible);
  if (!visible || typeof document === "undefined") return null;

  return createPortal(
    <div className="cx-install-layer" role="presentation">
      <section
        className="cx-install-prompt"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-title"
      >
        <button className="cx-install-close" onClick={finish} aria-label="Agora não">
          <X size={18} />
        </button>
        <span className="cx-install-icon">
          <Smartphone size={30} />
        </span>
        <span className="cx-eyebrow">Clonex no seu celular</span>
        <h2 id="install-title">Instale o app para acessar mais rápido</h2>
        <p>
          {isIos
            ? "No Safari, toque em Compartilhar e depois em Adicionar à Tela de Início."
            : nativePrompt
              ? "Instale o Clonex como aplicativo e abra direto pela sua tela inicial."
              : "Use o menu do navegador e escolha Instalar app ou Adicionar à tela inicial."}
        </p>
        {isIos ? (
          <div className="cx-install-ios">
            <Share size={18} />
            <span>Compartilhar → Adicionar à Tela de Início</span>
          </div>
        ) : null}
        <button className="cx-button" onClick={() => void install()}>
          <Download size={18} /> {nativePrompt ? "Instalar Clonex" : "Entendi, ir ao início"}
        </button>
        <button className="cx-install-later" onClick={finish}>
          Continuar no navegador
        </button>
      </section>
    </div>,
    document.body,
  );
}
