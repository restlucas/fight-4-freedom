"use client";

import { useState } from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";

import { Users, Trophy } from "lucide-react";
import { ProtectedRoute } from "@/src/components/protected-route";
import { MedalsTab } from "./components/medals/list";
import { UsersTab } from "./components/users/list";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"players" | "medals">("players");

  return (
    <ProtectedRoute requiredRole={["ADMIN"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard Administrativo</h1>
          <p>Gerencie jogadores, medalhas e atribuições do clã</p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "players" | "medals")}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="players" className="gap-2">
              <Users className="h-4 w-4" />
              Jogadores
            </TabsTrigger>
            <TabsTrigger value="medals" className="gap-2">
              <Trophy className="h-4 w-4" />
              Medalhas
            </TabsTrigger>
          </TabsList>

          {/* Players CRUD */}
          <TabsContent value="players" className="space-y-6">
            <UsersTab />
          </TabsContent>

          {/* Medals CRUD */}
          <TabsContent value="medals" className="space-y-6">
            <MedalsTab />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
