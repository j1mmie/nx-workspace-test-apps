import { User, Signature } from '@nx-workspace-test-apps/core'
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as canonicalize from 'canonicalize'
import * as secp256k1 from 'secp256k1'

admin.initializeApp();

admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

export const helloWorld = functions.https.onRequest((request, response) => {
  console.log('Hello World');

  const privKey = [...[...Array(32)].keys()]

  const user1 = new User('Jimmie Bo Bimmy', 'Captain', 37, [])
  const sig1 = Signature.sign(user1, privKey)

  const user2 = new User('Ashley Bo Bashy', 'Madame', 38, [])
  const sig2 = Signature.sign(user2, privKey)

  functions.logger.info('Hello logs!', { structuredData: true });

  const out = `user: ${user1.title} ${user1.name}, age ${user1.age} years. signature: ${sig1}
user: ${user2.title} ${user2.name}, age ${user2.age} years. signature: ${sig2}`

  response.send(out);
});
