import { NODE } from './config';
import secrets from 'secrets';
import { version } from '../../package.json';

const networkToProjectId = {
  mainnet: secrets.PROJECT_ID_MAINNET,
  testnet: secrets.PROJECT_ID_TESTNET,
  preprod: secrets.PROJECT_ID_PREPROD,
  preview: secrets.PROJECT_ID_PREVIEW,
};

const base = (node = NODE.mainnet) => node;
export default {
  api: {
    ipfs: 'https://ipfs.blockfrost.dev/ipfs',
    base,
    header: { [secrets.NAMI_HEADER || 'dummy']: version },
    key: (network = 'mainnet') => ({
      project_id: networkToProjectId[network],
    }),
    price: (currency = 'usd') =>
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=${currency}`
      )
        .then((res) => res.json())
        .then((res) => res.cardano[currency]),
    mithril: (network) => {
      // const mithrilBaseURL = new URL('http://localhost:3000');
      let mithrilBaseURL = base(network).node;
      mithrilBaseURL = mithrilBaseURL + '/mithril';
      return mithrilBaseURL;
    },
  },
};
