"use client";

import Link from "next/link";
import {
  DiscordLogoIcon,
  InstagramLogoIcon,
  WhatsappLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-2">
              BF6 <span className="text-primary">F4F</span>
            </h3>
            <p className="text-lg">
              Jogadores dedicados e apaixonados por Battlefield
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://chat.whatsapp.com/CbKz17jSaUp8S98ZrN3yNa?mode=ems_wa_t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary hover:bg-accent-foreground/80 transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsappLogoIcon size={32} className="text-green-500" />
            </Link>
            <Link
              href="https://discord.gg/yourserver"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary hover:bg-accent-foreground/80 transition-colors"
              aria-label="Discord"
            >
              <DiscordLogoIcon size={32} className="text-blue-500" />
            </Link>
            <Link
              href="https://www.instagram.com/fight4freedombr/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary hover:bg-accent-foreground/80 transition-colors"
              aria-label="Instagram"
            >
              <InstagramLogoIcon size={32} className="text-pink-500" />
            </Link>
            <Link
              href="https://www.youtube.com/@Fight4FreedomBR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary hover:bg-accent-foreground/80 transition-colors"
              aria-label="YouTube"
            >
              <YoutubeLogoIcon size={32} className="text-red-500" />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p>© 2025 Fight 4 Freedom. Todos os direitos reservados.</p>
        </div>

        <div className="mt-2 text-center text-muted-foreground">
          Desenvolvido por{" "}
          <Link
            href="https://www.linkedin.com/in/restlucas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            [F4F] melansia
          </Link>
        </div>
      </div>
    </footer>
  );
}
