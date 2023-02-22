import * as crypto from 'crypto'
import * as secp256k1 from 'secp256k1'

import canonicalize from 'canonicalize'

export class Signature {
  public static hash(msg:object) {
    const json = canonicalize(msg) ?? '{}'
    const hashBuff = crypto.createHash('sha256').update(json).digest()
    return hashBuff
  }

  public static sign(msg:object, privKey:number[]):string {
    const privKeyBytes = Uint8Array.from(privKey)
    const hash = this.hash(msg)
    const sig = secp256k1.ecdsaSign(hash, privKeyBytes)
    const sigBuff = Buffer.from(sig.signature)
    return sigBuff.toString('base64')
  }

  public static verify(msg:object, signatureB64:string, privKey:number[]):boolean {
    const privKeyBytes = Uint8Array.from(privKey)
    const pubKey = secp256k1.publicKeyCreate(privKeyBytes)
    const hash = this.hash(msg)
    const sig = Buffer.from(signatureB64, 'base64')

    try {
      return secp256k1.ecdsaVerify(sig, hash, pubKey)
    } catch (e:any) {
      console.error(`Signature.verify threw and error: ${e}`)
      return false
    }
  }
}
