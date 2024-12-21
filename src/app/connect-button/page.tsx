"use client";
import type { NextPage } from "next";
import { ConnectButton } from "thirdweb/react";
import { client } from "../../lib/client";
import { authedOnly, generatePayload, isLoggedIn, login, logout } from "./actions/auth";
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import {
  createWallet,
  inAppWallet,
} from 'thirdweb/wallets';
import {
  defineChain,
  polygon,
  optimism,
  base,
  zora,
  zoraSepolia,
} from 'thirdweb/chains';

const ConnectButtonPage: NextPage = () => {
  const wallets = [
    inAppWallet({
      auth: {
        options: [
          'farcaster',
          'discord',
          'passkey',
          'phone',
          'apple',
          'google',
          'email',
        ],
      },
    }),
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    createWallet('global.safe'),
  ];

  const storyTestnet = defineChain(1513);

  return (
    <ConnectButton
      client={client}
      chains={[base]}
      connectButton={{
        label: 'Get Started',
        className: 'my-custom-class',
        style: {
          backgroundColor: '#EC407A',
          color: 'white',
          borderRadius: '10px',
        },
      }}
      // accountAbstraction={{
      //   chain: defineChain(polygon),
      //   client: client,
      //   sponsorGas: false,
      //   factoryAddress: `${ACCOUNT_FACTORY_ADDRESS.polygon}`,
      // }}
      wallets={wallets}
      appMetadata={{
        name: 'Creative TV',
        url: 'https://tv.creativeplatform.xyz',
        description: 'The Stage is Yours',
        logoUrl:
          'https://bafybeiesvinhgaqvr62rj77jbwkazg3w6bhcrsfyg6zyozasaud53nucnm.ipfs.w3s.link/Creative%20TV%20Logo.png',
      }}
      walletConnect={{
        projectId: 'dc6a426a325d62879d4b9c6ef6dcedb1',
      }}
      // supportedNFTs={{
      //   137: [
      //     '0xad597e5b24ad2a6032168c76f49f05d957223cd0',
      //     '0xb6b645c3e2025cf69983983266d16a0aa323e2b0',
      //   ],
      // }}
      connectModal={{
        size: 'wide',
        privacyPolicyUrl:
          'https://creativeplatform.xyz/docs/legal/privacy-policy',
        termsOfServiceUrl:
          'https://creativeplatform.xyz/docs/legal/terms-conditions',
        welcomeScreen: {
          img: {
            width: 200,
            height: 200,
            src: 'https://bafybeifvsvranpnmujrpcry6lqssxtyfdvqz64gty4vpkhvcncuqd5uimi.ipfs.w3s.link/logo-tv.gif',
          },
          subtitle: 'The Stage is Yours',
          title: 'Welcome to Creative TV',
        },
      }}
      auth={{
        getLoginPayload: async (params: GenerateLoginPayloadParams) => {
          console.log({ getLoginPayloadParams: params });

          const payload = await generatePayload({ address: params.address, chainId: params.chainId });

          console.log({ payload });

          return payload;
        },
        doLogin: async (
          params: VerifyLoginPayloadParams,
        ): Promise<void> => {
          console.log('logging in!');
          
          await login(params);
        },
        isLoggedIn: async () => {
          const authedOnlyRes = await authedOnly();
          console.log({ authedOnlyRes });
          return authedOnlyRes;
        },
        doLogout: async () => {
          console.log('logging out...');
          await logout();
        },
      }}
    />
  );
};

export default ConnectButtonPage;
