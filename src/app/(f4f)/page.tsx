"use client";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import Link from "next/link";
import { Trophy, Users, Zap, Shield, Crosshair } from "lucide-react";
import {
  DiscordLogoIcon,
  HardDrivesIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url(/images/battlefield.avif)",
          }}
        />

        <div className="animate-fadeIn container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <Badge className="bg-primary/20 text-primary border-primary">
              BF6
            </Badge>

            <h1 className="mb-6 text-7xl md:text-7xl font-bold leading-tight text-balance">
              FIGHT 4 FREEDOM
            </h1>

            <p className="mb-8 text-2xl leading-relaxed text-pretty">
              O Clã [F4F] Fight 4 Freedom nasceu com o propósito de construir
              uma comunidade sólida e acolhedora para todos os jogadores
              apaixonados por Battlefield e quem sabe no futuro outros jogos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/jogadores">
                  <Users className="h-5 w-5" />
                  <span className="text-lg">Ver Jogadores</span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent"
                asChild
              >
                <Link href="/medalhas">
                  <Trophy className="h-5 w-5" />
                  <span className="text-lg">Sistema de Medalhas</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About the squad */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              BEM-VINDO AO <span className="text-primary">F4F</span>
            </h2>
            <p className="text-lg md:text-xl eading-relaxed">
              Somos uma comunidade de jogadores dedicados que buscam excelência
              no campo de batalha. Valorizamos trabalho em equipe, comunicação
              estratégica, melhoria contínua mas acima de tudo, diversão. Se
              você busca evoluir suas habilidades enquanto joga com os melhores,
              este é o seu lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-border bg-card hover:border-primary/50 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-3xl font-semibold">Comunidade</h3>
              <p className="leading-relaxed text-lg">
                Nossa comunidade é composta por jogadores de todos os níveis,
                desde os mais iniciantes até os mais avançados. Todos são
                bem-vindos para contribuir com o clã e se divertir.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card hover:border-primary/50 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-3xl font-semibold">Jogadores</h3>
              <p className="leading-relaxed text-lg">
                Nossos jogadores são dedicados e disponíveis diariamente para
                treinos, ranked e partidas casuais. Construímos amizades
                duradouras além do jogo.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card hover:border-primary/50 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10">
                <Trophy className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="mb-2 text-3xl font-semibold">Competitivo</h3>
              <p className="leading-relaxed text-lg">
                Participamos de torneios e competições regionais, sempre
                buscando os primeiros lugares e representando o clã com honra.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Medals System */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl  font-bold mb-4">
              SISTEMA DE <span className="text-primary">MEDALHAS</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Nossa equipe desenvolveu um sistema de medalhas para que todos
              possam se divertir e também subir de patente através dos tiers de
              pontuação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-border bg-linear-to-br from-chart-4/5 to-transparent hover:from-chart-4/10 transition-all">
              <div className="text-center">
                <div className="mb-3 text-4xl">🏆</div>
                <h3 className="mb-2 font-semibold text-chart-4">Lendárias</h3>
                <p className=" text-muted-foreground">
                  As conquistas mais raras e prestigiadas
                </p>
              </div>
            </Card>

            <Card className="p-6 border-border bg-linear-to-br from-chart-3/5 to-transparent hover:from-chart-3/10 transition-all">
              <div className="text-center">
                <div className="mb-3 text-4xl">💎</div>
                <h3 className="mb-2 font-semibold text-chart-3">Épicas</h3>
                <p className=" text-muted-foreground">
                  Feitos extraordinários de combate
                </p>
              </div>
            </Card>

            <Card className="p-6 border-border bg-linear-to-br from-chart-2/5 to-transparent hover:from-chart-2/10 transition-all">
              <div className="text-center">
                <div className="mb-3 text-4xl">⭐</div>
                <h3 className="mb-2 font-semibold text-chart-2">Raras</h3>
                <p className=" text-muted-foreground">
                  Conquistas significativas
                </p>
              </div>
            </Card>

            <Card className="p-6 border-border bg-linear-to-br from-muted/20 to-transparent hover:from-muted/30 transition-all">
              <div className="text-center">
                <div className="mb-3 text-4xl">🎖️</div>
                <h3 className="mb-2 font-semibold">Comuns</h3>
                <p className=" text-muted-foreground">
                  Marcos de progresso essenciais
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/medalhas" className="text-xl">
                Ver Todas as Medalhas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Participation Channels */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              JUNTE-SE A <span className="text-primary">NÓS</span>
            </h2>
            <p className="text-lg md:text-xl eading-relaxed">
              Estamos sempre recrutando jogadores para fortalecer a nossa
              comunidade. Entre em contato através dos nossos canais oficiais e
              comece sua jornada conosco.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-8 border-border bg-card hover:border-primary transition-all group">
              <Link
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <WhatsappLogoIcon size={32} className="text-green-500" />
                </div>
                <h3 className="mb-2 text-xl md:text-2xl font-semibold">
                  WhatsApp
                </h3>
                <p>Converse diretamente com nossos recrutadores</p>
              </Link>
            </Card>

            <Card className="p-8 border-border bg-card hover:border-primary transition-all group">
              <Link
                href="https://discord.gg/yourserver"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-3/10 group-hover:bg-chart-3/20 transition-colors">
                  <DiscordLogoIcon size={32} className="text-blue-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">
                  Discord
                </h3>
                <p>Nossa base de comunicação e organização</p>
              </Link>
            </Card>

            <Card className="p-8 border-border bg-card hover:border-primary transition-all group">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20F transition-colors">
                  <HardDrivesIcon size={32} className="text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">
                  Servidor BF6
                </h3>
                <p className="mb-3">Nosso servidor oficial no jogo</p>
                <Badge variant="outline" className="font-mono text-xs">
                  [F4F] Fight 4 Freedom
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url(/images/battlefield-3.avif)",
          }}
        />

        <div className="animate-fadeIn container relative mx-auto px-4 py-24 md:py-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">32</div>
              <div className="text-lg">Membros Ativos</div>
            </div>

            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">127</div>
              <div className="text-lg">Medalhas Conquistadas</div>
            </div>

            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <Crosshair className="h-8 w-8 text-chart-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">2.34</div>
              <div className="text-lg">K/D Médio do Clã</div>
            </div>

            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <Zap className="h-8 w-8 text-chart-2" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">68%</div>
              <div className="text-lg">Taxa de Vitória</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
