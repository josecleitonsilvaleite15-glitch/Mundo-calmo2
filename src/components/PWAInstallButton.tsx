import React, { useState } from 'react';
import { Download, Share2, X, WifiOff } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { TactileButton } from './TactileButton';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // Already running as an installed standalone mobile app
  if (isInstalled) {
    return null;
  }

  const handlePress = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <TactileButton
        type="button"
        onClick={handlePress}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#1A365D] font-display font-semibold text-sm"
      >
        <Download className="w-4 h-4 text-[#3B9AE1]" />
        <span>Baixar aplicativo no celular</span>
      </TactileButton>

      {showGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Como baixar o aplicativo no celular"
          className="absolute inset-0 z-50 bg-[#1A365D]/35 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full bg-white border border-sky-200 rounded-3xl p-5 shadow-xl text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-lg text-[#1A365D]">
                Instalar mundo calmo
              </h3>
              <TactileButton
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Fechar instruções"
                className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#1A365D]"
              >
                <X className="w-4 h-4" />
              </TactileButton>
            </div>

            {isIOS ? (
              <div className="space-y-2.5 text-sm text-[#4A6B8C]">
                <p>Para instalar no iPhone ou iPad pelo Safari:</p>
                <p className="bg-sky-50 border border-sky-100 rounded-2xl p-3 text-[#1A365D]">
                  1. Toque no ícone de <strong className="inline-flex items-center gap-1">Compartilhar <Share2 className="w-3.5 h-3.5 inline" /></strong> na barra do navegador.<br />
                  2. Role para baixo e toque em <strong>Adicionar à Tela de Início</strong>.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 text-sm text-[#4A6B8C]">
                <p>Para instalar no celular Android (Chrome):</p>
                <p className="bg-sky-50 border border-sky-100 rounded-2xl p-3 text-[#1A365D]">
                  1. Abra o link do app diretamente no <strong>Chrome</strong> do seu celular.<br />
                  2. Toque no menu <strong>(⋮)</strong> no canto superior direito.<br />
                  3. Selecione <strong>Instalar aplicativo</strong> ou <strong>Adicionar à tela inicial</strong>.
                </p>
              </div>
            )}

            <TactileButton
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-4 w-full py-3 min-h-[44px] rounded-2xl bg-[#3B9AE1] text-white font-display font-semibold text-sm"
            >
              Entendi
            </TactileButton>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="px-3 py-1.5 bg-sky-100 border-t border-sky-200 flex items-center justify-center gap-2 text-xs font-semibold text-[#1A365D] shrink-0">
      <WifiOff className="w-3.5 h-3.5 text-[#3B9AE1]" />
      <span>Modo offline · Jogos prontos para brincar</span>
    </div>
  );
};
