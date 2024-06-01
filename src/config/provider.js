import { NODE } from './config';
import secrets from 'secrets';
import { version } from '../../package.json';

const networkToProjectId = {
  mainnet: secrets.PROJECT_ID_MAINNET,
  testnet: secrets.PROJECT_ID_TESTNET,
  preprod: secrets.PROJECT_ID_PREPROD,
  preview: secrets.PROJECT_ID_PREVIEW,
};

export default {
  api: {
    ipfs: 'https://ipfs.blockfrost.dev/ipfs',
    base: (node = NODE.mainnet) => node,
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
      const mithrilBaseURL = new URL('http://localhost:3000');
      // TODO: Mithril-client does not support URL with credentials,
      // nor there is any possibility to inject project_id header
      // const mithrilBaseURL = new URL(provider.api.base(network.node));
      // mithrilBaseURL.username = 'mithril';
      // mithrilBaseURL.password = networkToProjectId[network.name];
      mithrilBaseURL.pathname = mithrilBaseURL.pathname + 'mithril';

      console.log('mithrilBaseURL.href', mithrilBaseURL.href);
      return mithrilBaseURL.href;
    },
  },
};
