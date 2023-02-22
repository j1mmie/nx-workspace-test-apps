import { User, Signature } from '@nx-workspace-test-apps/core'

console.log('Hello World');

const privKey = [...[...Array(32)].keys()]

const user1 = new User('Jimmie Bo Bimmy', 'Captain', 37, [])
const sig1 = Signature.sign(user1, privKey)

const user2 = new User('Ashley Bo Bashy', 'Madame', 38, [])
const sig2 = Signature.sign(user2, privKey)

console.log(`user: ${user1.title} ${user1.name}, age ${user1.age} years. signature: ${sig1}`);
console.log(`user: ${user2.title} ${user2.name}, age ${user2.age} years. signature: ${sig2}`);
