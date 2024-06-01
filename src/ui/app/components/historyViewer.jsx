import { Box, Text, Spinner, Accordion, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';
import Loader from '../../../api/loader';
import { File } from 'react-kawaii';
import {
  getNetwork,
  getTransactions,
  getTxCBOR,
  setTransactions,
  setTxDetail,
} from '../../../api/extension';
import Transaction from './transaction';
import { useCaptureEvent } from '../../../features/analytics/hooks';
import { Events } from '../../../features/analytics/events';
import initMithrilClient, {
  MithrilClient,
} from '@mithril-dev/mithril-client-wasm';
import provider from '../../../config/provider';
import { output } from '../../../../webpack.config';

// let aggregator_endpoint =
//   'http://mithril:mainnetjTvHPJCsB63oTESdYcua2ZhKTECveeIG@localhost:4000/backend/mithril';

const network = getNetwork();
let aggregator_endpoint = provider.api.mithril(network);

let genesis_verification_key =
  '5b3132372c37332c3132342c3136312c362c3133372c3133312c3231332c3230372c3131372c3139382c38352c3137362c3139392c3136322c3234312c36382c3132332c3131392c3134352c31332c3233322c3234332c34392c3232392c322c3234392c3230352c3230352c33392c3233352c34345d';

// const broadcast_channel = new BroadcastChannel('mithril-client');
// broadcast_channel.onmessage = (e) => {
//   let event = e.data;
//   if (event.type == 'CertificateChainValidationStarted') {
//     console.log('The certificate chain validation has started');
//   } else if (event.type == 'CertificateValidated') {
//     console.log(
//       'A certificate has been validated, certificate_hash: ' +
//         event.payload.certificate_hash
//     );
//   } else if (event.type == 'CertificateChainValidated') {
//     console.log('The certificate chain is valid');
//   } else {
//     console.log(event);
//   }
// };

const getTxsCerts = async (txHashes) => {
  await initMithrilClient();

  let client = await new MithrilClient(
    aggregator_endpoint,
    genesis_verification_key
  );
  const proof = await client.unstable.get_cardano_transaction_proofs(txHashes);

  console.log('Proof', proof);
  console.log('Proof.transactions_hashes', proof.transactions_hashes);

  let proof_certificate = await client.verify_certificate_chain(
    proof.certificate_hash
  );
  console.log(
    'verify_certificate_chain OK, last_certificate_from_chain:',
    proof_certificate
  );

  let valid_cardano_transaction_proof =
    await client.unstable.verify_cardano_transaction_proof_then_compute_message(
      proof,
      proof_certificate
    );
  console.log(
    'valid_cardano_transaction_proof:',
    valid_cardano_transaction_proof
  );

  return proof;
};

export const multiAssetToArray = (multiAsset) => {
  if (!multiAsset) return [];
  const assetsArray = [];
  const policyHashes = multiAsset.keys();

  for (let i = 0; i < policyHashes.len(); i++) {
    const policyId = policyHashes.get(i);
    const assetsInPolicy = multiAsset.get(policyId);
    if (!assetsInPolicy) continue;

    const assetNames = assetsInPolicy.keys();
    for (let j = 0; j < assetNames.len(); j++) {
      const assetName = assetNames.get(j);
      const amount = assetsInPolicy.get(assetName);
      if (!amount) continue;

      const policyIdHex = Buffer.from(policyId.to_bytes()).toString('hex');
      const assetNameHex = Buffer.from(assetName.name()).toString('hex');

      assetsArray.push({
        quantity: amount.to_str(),
        unit: `${policyIdHex}${assetNameHex}`,
      });
    }
  }
  return assetsArray;
};

const verifyCBORData = async (txHashes, history) => {
  const verifiedTxHashes = [];
  await Loader.load();

  const Cardano = Loader.Cardano;
  for (const txHash of txHashes) {
    const txData = history.details[txHash];
    const txCBOR = await getTxCBOR(txHash);

    console.log(`Verifying ${txHash}...`);

    if (!txData) {
      continue;
    }

    // Note: Computing tx hash using old CML that is included in Nami is flawed.
    // The computed tx hash may be different than the original despite the transaction being the same
    // CSL provides a way to safely compute original tx hash:
    // https://github.com/Emurgo/cardano-serialization-lib/issues/604
    // const tx = Cardano.FixedTransaction.from_hex(txCBOR);
    // const computedTxHash = Cardano.TransactionHash.from_bytes(blake2b(32).update(tx.raw_body()).digest('binary'));

    const tx = Cardano.Transaction.from_bytes(Buffer.from(txCBOR, 'hex'));
    const txBody = tx.body();

    // Verify that received tx hash matches the received CBOR data
    const computedTxHash = Buffer.from(
      Cardano.hash_transaction(txBody).to_bytes()
    ).toString('hex');

    if (txHash !== computedTxHash) {
      console.log(
        `Computed tx hash ${computedTxHash} does not match Blockfrost JSON data ${txHash}`
      );
    }

    const { inputs, outputs } = txData.utxos;

    if (txBody.outputs().len() !== outputs.length) {
      console.log(
        `CBOR verification failed for tx ${txHash}. Outputs length mismatch (CBOR: ${txBody
          .outputs()
          .len()}, JSON: ${outputs.length})`
      );
      continue;
    }

    // Compare tx inputs
    for (let i = 0; i < inputs.length; i++) {
      const cborInput = txBody.inputs().get(i);
      const jsonInput = inputs[i];
      if (cborInput.transaction_id().to_hex() !== jsonInput.tx_hash) {
        console.log(
          `Tx input ${jsonInput.txHash} mismatch (CBOR: ${cborInput
            .transaction_id()
            .to_hex()} JSON: ${jsonInput.txHash})`
        );
        continue;
      }

      if (cborInput.index().to_str() !== jsonInput.output_index.toString()) {
        console.log(
          `Tx input ${
            jsonInput.txHash
          } index mismatch (CBOR: ${cborInput.index()} JSON: ${
            jsonInput.output_index
          })`
        );
        continue;
      }
    }

    // Compare tx outputs
    for (let i = 0; i < outputs.length; i++) {
      const cborOutput = txBody.outputs().get(i);
      const jsonOutput = outputs[i];
      // lovelace amount

      const jsonLovelaceAMount = jsonOutput.amount.find(
        (a) => a.unit === 'lovelace'
      )?.quantity;
      if (cborOutput.amount().coin().to_str() !== jsonLovelaceAMount) {
        console.log(
          `amounts do not match. CBOR: ${cborOutput
            .amount()
            .coin()
            .to_str()}, JSON: ${jsonLovelaceAMount}`
        );
        continue;
      }
      // address
      if (cborOutput.address().to_bech32() !== jsonOutput.address) {
        console.log(`addresses do not match`);
        continue;
      }

      // compare assets
      const cborAssets = multiAssetToArray(cborOutput.amount().multiasset());
      for (const asset of cborAssets) {
        const receivedAmount = jsonOutput.amount.find(
          (unit) => unit === asset.unit
        ).amount;
        const amountMatch = receivedAmount === asset.quantity;
        if (!amountMatch) {
          console.log(
            `amount of ${asset.unit} does not match. Received: ${receivedAmount}. Expected: ${asset.quantity}`
          );
        }
      }
    }

    verifiedTxHashes.push(txHash);
  }

  console.log(`CBOR verified txs`, verifiedTxHashes);
  return {
    verifiedTxHashes,
  };
};

const BATCH = 5;

let slice = [];

let txObject = {};

const HistoryViewer = ({ history, network, currentAddr, addresses }) => {
  const capture = useCaptureEvent();
  const [historySlice, setHistorySlice] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [final, setFinal] = React.useState(false);
  const [loadNext, setLoadNext] = React.useState(false);
  const [isMithrilLoading, setIsMithrilLoading] = React.useState(false);
  const [verificationData, setVerificationData] = React.useState();

  const getTxs = async () => {
    if (!history) {
      slice = [];
      setHistorySlice(null);
      setPage(1);
      setFinal(false);
      return;
    }
    await new Promise((res, rej) => setTimeout(() => res(), 10));
    slice = slice.concat(
      history.confirmed.slice((page - 1) * BATCH, page * BATCH)
    );

    if (slice.length < page * BATCH) {
      const txs = await getTransactions(page, BATCH);

      if (txs.length <= 0) {
        setFinal(true);
      } else {
        slice = Array.from(new Set(slice.concat(txs.map((tx) => tx.txHash))));
        await setTransactions(slice);
      }
    }
    if (slice.length < page * BATCH) setFinal(true);

    setHistorySlice(slice);
    await runMithrilValidation(slice);
  };

  React.useEffect(() => {
    getTxs();
  }, [history, page]);

  React.useEffect(() => {
    const storeTx = setInterval(() => {
      if (Object.keys(txObject).length <= 0) return;
      setTimeout(() => setTxDetail(txObject));
    }, 1000);
    return () => {
      slice = [];
      setHistorySlice(null);
      setPage(1);
      setFinal(false);
      clearInterval(storeTx);
    };
  }, []);

  React.useEffect(() => {
    if (!historySlice) return;
    if (historySlice.length >= (page - 1) * BATCH) setLoadNext(false);
  }, [historySlice]);

  const runMithrilValidation = async (txHashes) => {
    setIsMithrilLoading(true);
    // Verify that tx hashes matches CBOR data
    const cborVerification = await verifyCBORData(txHashes, history);
    // Get Mithril proofs
    const proof = await getTxsCerts(txHashes);
    setVerificationData({ mithril: proof, cbor: cborVerification });
    setIsMithrilLoading(false);
  };

  console.log('verificationData', verificationData);
  return (
    <Box position="relative">
      {!(history && historySlice) ? (
        <HistorySpinner />
      ) : historySlice.length <= 0 ? (
        <Box
          mt="16"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          opacity="0.5"
        >
          <File size={80} mood="ko" color="#61DDBC" />
          <Box height="2" />
          <Text fontWeight="bold" color="GrayText">
            No History
          </Text>
        </Box>
      ) : (
        <>
          <Accordion
            allowToggle
            borderBottom="none"
            onClick={() => {
              capture(Events.ActivityActivityActivityRowClick);
            }}
          >
            {historySlice.map((txHash, index) => {
              if (!history.details[txHash]) history.details[txHash] = {};
              const mithrilVerified =
                verificationData?.mithril.transactions_hashes.find(
                  (proofTxHash) => proofTxHash === txHash
                );
              const cborVerified = verificationData?.cbor.verifiedTxHashes.find(
                (proofTxHash) => proofTxHash === txHash
              );

              return (
                <Transaction
                  onLoad={(txHash, txDetail) => {
                    txObject[txHash] = txDetail;
                  }}
                  mithrilVerified={mithrilVerified && cborVerified}
                  isMithrilLoading={isMithrilLoading}
                  key={index}
                  txHash={txHash}
                  detail={history.details[txHash]}
                  currentAddr={currentAddr}
                  addresses={addresses}
                  network={network}
                />
              );
            })}
          </Accordion>
          {final ? (
            <Box
              textAlign="center"
              // mt={18}
              fontSize={16}
              fontWeight="bold"
              color="gray.400"
            >
              ... nothing more
            </Box>
          ) : (
            <Box textAlign="center">
              <Button
                variant="outline"
                onClick={() => {
                  setLoadNext(true);
                  setTimeout(() => setPage(page + 1));
                }}
                colorScheme="orange"
                aria-label="More"
                fontSize={20}
                w="50%"
                h="30px"
                rounded="xl"
              >
                {loadNext ? '...' : <ChevronDownIcon fontSize="30px" />}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

const HistorySpinner = () => (
  <Box mt="28" display="flex" alignItems="center" justifyContent="center">
    <Spinner color="teal" speed="0.5s" />
  </Box>
);

export default HistoryViewer;
