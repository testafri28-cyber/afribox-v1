# Leads → Google Sheet (webhook Apps Script)

Les formulaires **Contact** et **Réservation** envoient chaque demande à la route
serveur `/api/lead`, qui la transmet à un **Google Sheet** via un webhook Google
Apps Script. En parallèle, l'utilisateur peut finaliser sur **WhatsApp** (bouton
pré-rempli). Les deux canaux sont indépendants : si le Sheet n'est pas configuré
ou tombe en panne, le formulaire continue de fonctionner et WhatsApp prend le
relais.

```
Formulaire ──► /api/lead (serveur) ──► Webhook Apps Script ──► Google Sheet
        └─────► Bouton « Continuer sur WhatsApp » (wa.me pré-rempli)
```

## 1. Créer le Google Sheet

1. Crée un nouveau Google Sheet (ex. **Afribox — Leads**).
2. En ligne 1, mets les en-têtes de colonnes :

   ```
   receivedAt | type | firstName | lastName | email | phone | role | subject | message | locker | address | size | duration | payment | total | ref | source
   ```

   (Les colonnes non pertinentes selon le type de lead resteront vides — c'est
   normal : « contact » et « reservation » ne remplissent pas les mêmes champs.)

## 2. Ajouter le script

Dans le Sheet : **Extensions → Apps Script**, colle ce code puis enregistre :

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Feuille 1')
    || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents);

  // Ordre des colonnes — doit correspondre à la ligne d'en-tête du Sheet.
  const cols = [
    'receivedAt', 'type', 'firstName', 'lastName', 'email', 'phone', 'role',
    'subject', 'message', 'locker', 'address', 'size', 'duration', 'payment',
    'total', 'ref', 'source',
  ];

  sheet.appendRow(cols.map(function (c) {
    return data[c] !== undefined && data[c] !== null ? data[c] : '';
  }));

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Déployer en Web App

1. **Déployer → Nouveau déploiement**.
2. Type : **Application Web**.
3. « Exécuter en tant que » : **moi**.
4. « Qui a accès » : **Tout le monde**.
5. Déploie, autorise, puis **copie l'URL de l'application Web**
   (`https://script.google.com/macros/s/.../exec`).

## 4. Brancher l'URL

- **En local** : dans `.env.local`
  ```
  GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
  ```
- **Sur Vercel** : Project Settings → Environment Variables → `GOOGLE_SHEET_WEBHOOK_URL`
  (puis redeploy).

## 5. Tester

Remplis le formulaire de contact ou fais une réservation de test : une nouvelle
ligne doit apparaître dans le Sheet. Si rien n'arrive, vérifie les logs de la
route (`[lead] …`) et que le déploiement Apps Script est bien « Tout le monde ».

> Note sécurité : l'URL du webhook n'est utilisée que **côté serveur**
> (`/api/lead`), jamais exposée au navigateur. Ne la commite pas — elle vit
> uniquement dans les variables d'environnement.
