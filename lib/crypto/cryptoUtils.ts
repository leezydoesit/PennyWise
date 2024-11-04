import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const ENCODING = 'hex'
const IV_LENGTH = 16

// Decode the Base64 key to get the raw binary key
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'base64')

// Ensure the encryption key is 32 bytes long
if (KEY.length !== 32) {
  throw new Error('Encryption key must be 32 bytes long')
}

export const encrypt = (data: string) => {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)
  const encryptedData = Buffer.concat([cipher.update(data), cipher.final()])

  // Combine the IV and encrypted data, then convert to hex
  return iv.toString(ENCODING) + ':' + encryptedData.toString(ENCODING)
}

export const decrypt = (data: string) => {
  const parts = data.split(':')
  if (parts.length !== 2) {
    throw new Error('Data format is incorrect')
  }

  const [ivHex, encryptedDataHex] = parts
  const iv = Buffer.from(ivHex, ENCODING)
  const encryptedData = Buffer.from(encryptedDataHex, ENCODING)
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)

  try {
    const decryptedData = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ])
    return decryptedData.toString()
  } catch (error) {
    // @ts-ignore
    throw new Error(`Decryption failed: ${error.message}`)
  }
}
