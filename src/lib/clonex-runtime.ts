import * as React from "react";
import capaceteAsset from "@/assets/equip-capacete.png.asset.json";
import celularAsset from "@/assets/equip-celular.png.asset.json";
import ajudaAsset from "@/assets/equip-ajuda.png.asset.json";
import empresaAsset from "@/assets/equip-empresa.png.asset.json";

/**
 * O protótipo Clonex é um bundle que registra as telas e o design system em
 * `window`. Ele precisa do React global e só pode rodar no browser.
 */
let loading: Promise<void> | null = null;

export function loadClonex(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (loading) return loading;

  const w = window as unknown as Record<string, unknown>;
  w["React"] = React;
  w["__resources"] = {
    capacete: capaceteAsset.url,
    celular: celularAsset.url,
    ajuda: ajudaAsset.url,
    empresa: empresaAsset.url,
  };

  loading = import("./clonex-bundle.js").then(() => undefined);
  return loading;
}

type AnyComponent = (props: Record<string, unknown>) => React.ReactNode;

export function g<T = AnyComponent>(name: string): T {
  return (window as unknown as Record<string, T>)[name];
}
