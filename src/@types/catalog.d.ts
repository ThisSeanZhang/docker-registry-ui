export type CataLog = {
  repositories: string[],
};
export type MenuItem = {
  label: string,
  key: string,
  icon?: any,
  children?: MenuItem[],
}
export type ImageTag = {
  name: string,
  tags: string[],
}
export type Manifest = {
  schemaVersion: number,
  // V1
  name?: string,
  tag?: string,
  architecture?: string,
  fsLayers?: FsLayers[],
  history?: ManifestsHistory[],
  signatures?: ManifestsSign[],
  // V2
  mediaType?: string,
  manifests?: ManifestInfo,
}
export type FsLayers = {
  blobSum: string,
}

export type ManifestsHistory = {
  v1Compatibility: string,
}
export type ManifestsSign = {
  header: {
    jwk: {
      crv: string,
      kid: string,
      kty: string,
      x: string,
      y: string,
    },
    alg: string,
  },
  signature: string,
  protected: string,
}

export type ManifestInfo = {
  mediaType: string,
  size: number,
  digest: string,
  platform: {
    architecture: string,
    os: string,
  },
}
