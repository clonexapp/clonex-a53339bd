import { createFileRoute } from "@tanstack/react-router";
import ClonexApp from "@/components/ClonexApp";

const title = "Clonex · Controle de captura para embodied AI";
const description =
  "Aplicativo de controle de captura de vídeo por capacetes e celulares: membros, sublíderes e líder geral, com equipamentos, metas e relatórios.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://clonexapp.lovable.app/og-clonex.png" },
      { name: "twitter:image", content: "https://clonexapp.lovable.app/og-clonex.png" },
    ],
  }),

  component: Index,
});

function Index() {
  return <ClonexApp />;
}
