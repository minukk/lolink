export const uuidToBuffer = (uuid: string): Buffer => {
  const tokens = uuid.split('-');

  const bytes = Buffer.from(
    tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4],
    'hex',
  );

  return bytes;
};

export const bufferToUuid = (buffer: Buffer): string => {
  const parts = [
    buffer.slice(6, 8).toString('hex'), // tokens[0]
    buffer.slice(4, 6).toString('hex'), // tokens[1]
    buffer.slice(0, 4).toString('hex'), // tokens[2]
    buffer.slice(8, 10).toString('hex'), // tokens[3]
    buffer.slice(10, 16).toString('hex'), // tokens[4]
  ];
  return parts.join('-');
};
