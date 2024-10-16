import { WalletItem, isInstallRequired, truncateAddress, useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";
import { Copy, LogOut } from "lucide-react";
import { useCallback, useEffect } from "react";
// Internal components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export function WalletSelector() {
  const { account, connect, connected, disconnect, wallets = [] } = useWallet();
  const mizuWallet = wallets.find((w) => w.name === "Mizu Wallet");
  const { toast } = useToast();

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address.",
      });
    }
  }, [account?.address, toast]);

  useEffect(() => {
    if (connected) {
      toast({
        title: "Success",
        description: "Connected " + account?.address
      });
    } else
    {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to wallet."
      });
    }
  }, [account, connected]);

  if (!mizuWallet) {
    return <>Mizu Wallet Not Found</>;
  }

  // const connectclick = useCallback(async ()=> {
  //     try {
  //         await connect(mizuWallet.name);
  //         toast({
  //             title: "Success",
  //             description: "Connected " + account?.address,
  //         });
  //     } catch {
  //         toast({
  //             variant: "destructive",
  //             title: "Error",
  //             description: "Failed to connect to wallet.",
  //         });
  //     }
  // }, [connect, mizuWallet.name, toast, account?.address]);

  const onConnect = async (walletName: WalletName) => {
    await connect(walletName);
    console.log("connected", account?.address);
  };

  return connected ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{account?.ansName || truncateAddress(account?.address) || "Unknown"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={copyAddress} className="gap-2">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={disconnect} className="gap-2">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <WalletItem wallet={mizuWallet} className="flex items-center justify-between px-4 py-3 gap-4 border rounded-md">
      <div className="flex items-center gap-4">
        <WalletItem.Icon className="h-6 w-6" />
        <WalletItem.Name className="text-base font-normal" />
      </div>
      {isInstallRequired(mizuWallet) ? (
        <Button size="sm" variant="ghost" asChild>
          <WalletItem.InstallLink />
        </Button>
      ) : (
        // <WalletItem.ConnectButton asChild>
        //   <Button size="sm">Connect</Button>
        // </WalletItem.ConnectButton>

        <button onClick={() => onConnect(mizuWallet.name)}>Connect Mizu Wallet</button>
        // <button onClick={connectclick}>Connect</button>
      )}
    </WalletItem>
  );
}
