import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="p-12 text-center border-border max-w-2xl mx-auto">
        <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Perfil Não Encontrado</h1>
        <p className="mb-6">
          Contate o administrador para resolver o problema.
        </p>
        <Button asChild>
          <Link href="/jogadores" className="text-white">
            Voltar para Jogadores
          </Link>
        </Button>
      </Card>
    </div>
  );
}
