export type Client = { name: string; logo: string; width: number; height: number };

// Logos are brand assets (not translated); background removed from the
// originals that had a solid white canvas so they read well on any
// section background. Add more entries here as the client shares them.
export const clients: Client[] = [
  { name: "ADOC", logo: "/clients/adoc.png", width: 673, height: 673 },
  { name: "Diana", logo: "/clients/diana.png", width: 366, height: 157 },
  { name: "Dollarcity", logo: "/clients/dollarcity.png", width: 462, height: 157 },
  { name: "Ingenio La Cabaña", logo: "/clients/ingenio-la-cabana.png", width: 611, height: 292 },
  { name: "La Constancia", logo: "/clients/la-constancia.png", width: 311, height: 73 },
  { name: "Livsmart", logo: "/clients/livsmart.png", width: 255, height: 122 },
];
