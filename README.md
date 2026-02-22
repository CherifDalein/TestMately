# Projet Mately - Gestion de Tâches Temps Réel

Ce projet est un test technique composé d'un **Backend Node.js/MongoDB** et d'une application mobile **React Native (Expo)**. Il simule un flux de tâches asynchrones avec une mise à jour automatique.

## Stack Technique

* **Frontend** : React Native (Expo), Axios, Custom Hooks.
* **Backend** : Node.js, Express, MongoDB Atlas.
* **Architecture** : Clean Architecture côté Front (Services, Hooks, Composants).

---

## Installation et Lancement

### 1. Backend

```bash
cd backend
npm install
# Crée un fichier .env avec : MONGO_URI=votre_lien_atlas et PORT=le_port_que_vous_souhaitez
npm run dev

```

### 2. Frontend

1. Ouvre `src/api/taskService.js`.
2. Remplace l'URL par l'IP de ton ordinateur : `http://<VOTRE_IP_LOCALE>:3000/api/tasks`.
3. Lance l'application :

```bash
cd frontend
npm install
npx expo start

```

*Scannez le QR Code avec l'application **Expo Go** (Android/iOS).*
#### Perso: j'avais  deja ANDROID STUDIO installé sur ma machine, donc j'ai exécuté directement sur l'emulateur de celui ci

---

## Logique & Conception

### Le Système de Polling "Delta"

Pour respecter la contrainte de **"pas de fetch redondant"**, j'ai implémenté une synchronisation par delta :

* Le frontend mémorise la date de création de la tâche la plus récente (`lastDateRef`).
* Toutes les 5 secondes, il demande uniquement les tâches créées **après** cette date.
* Si aucune nouvelle tâche n'est créée, le backend renvoie un tableau vide, évitant ainsi tout re-calcul inutile du DOM virtuel.

### Performance & UX

* **Custom Hook (`usePollTasks`)** : Isole la logique de synchronisation pour laisser les composants de vue légers.
* **Sécurisation des processus** : Lors du lancement d'une simulation (10 tâches sur 50s), le bouton disparaît et un état de chargement s'affiche pour éviter les envois multiples et les conflits de base de données.
* **Rendu optimisé** : Utilisation de `React.memo` sur les items de la liste pour éviter les re-renders des éléments déjà présents lors de l'ajout de nouveaux.

### Bonus implémentés

* **Statuts colorés** : Gris (todo), Bleu (in_progress), Vert (done).
* **Scroll intelligent** : La liste s'ajoute par le bas avec un auto-scroll fluide pour suivre l'arrivée des tâches en direct.

---

## Note de conception

L'architecture a été pensée pour être **scalable**. Le backend utilise des index MongoDB sur `createdAt` pour garantir que les requêtes de polling restent ultra-rapides, même avec des milliers de tâches. Le frontend sépare strictement les appels API de la logique de rendu, permettant une maintenance facilitée.
