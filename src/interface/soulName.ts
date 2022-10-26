export interface Attribute {
  display_type?: string;
  trait_type: string;
  value: number | string;
}

export interface ISoulName {
  description: "This is a soul name!";
  external_url: "https://beta.claimyoursoul.masa.finance";
  image: string;
  name: string;
  attributes: Attribute[];
}
