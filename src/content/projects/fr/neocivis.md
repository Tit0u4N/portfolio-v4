---
order: 0
title: "Néocivis"
shortDescription: "Plateforme civic-tech reliant citoyens et mairie"
image: "../../../assets/images/projects/neocivis.png"
linkGithub: "https://github.com/Tit0u4N/neocivis.git"
techs: ["TYPESCRIPT","REACT_TECH","NEXTJS","TAILWINDCSS","NODEJS","GIT"]
---

#### Présentation du Projet
Projet de fin d'études du Master 2, réalisé en équipe de 4 de décembre 2025 à juin 2026. **Néocivis** est une plateforme civic-tech qui relie les citoyens d'une ville à leur mairie. J'ai été co-lead du projet et de l'architecture globale (en binôme), tout en développant le frontend en autonomie et en pilotant la répartition des tâches et les délais.

#### Fonctionnalités
- 📍 **Signalements urbains** : géolocalisation, photo, description générée par IA et attribution automatique de tags.
- 🗺️ **Côté mairie** : consultation sur carte et en tableau, suivi du statut, historique des versions.
- 📰 **Modules** : actualités (éditeur WYSIWYG, i18n), forum d'entraide, notifications push, page mairie personnalisable, webhooks, sondages.
- 🔐 **Permissions granulaires** (RBAC).

#### Stack Technologique
- 🧱 **Monorepo Turborepo** : 2 applications frontend, backend serverless avec edge functions, packages partagés.
- 🖥️ **Web** : Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Zustand.
- 📱 **Mobile** : Expo 54, React Native.
- ✅ **Qualité** : TypeScript strict, Biome, Vitest, architecture MVVM.
