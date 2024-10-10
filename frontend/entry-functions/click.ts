import { MODULE_ADDRESS } from "@/constants";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";


const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const ADDRESS = "0x71141c00a3904a5f57bb33ad53024c360a1350568c2b7f706a848392ef6aba10";


export const click = (): InputTransactionData => {
  return {
    data: {
      function: `${MODULE_ADDRESS}::cad_tg_counter_app::click`,
      functionArguments: [],
    },
  };
};


export const sendApt = (): InputTransactionData => {
  return {
    data: {
      function: "0x1::coin::transfer",
      typeArguments: [APTOS_COIN],
      functionArguments: [ADDRESS, 100000000], // 1 is in Octas
    },
  };
};