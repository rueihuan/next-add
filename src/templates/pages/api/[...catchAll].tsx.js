// pages/api/[...catchAll].tsx

module.exports = /* javascript */ `import { Backend } from '../../server/main';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve) => {
    const handler = await Backend.getNestRequestHandler();
    handler(req, res);
    res.on("finish", resolve);
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
`
