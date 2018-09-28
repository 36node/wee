type GetSignatureRequest = {
  url: string;
  context?: Object;
};

type GetSignatureResponse = {
  body: Signature;
}

type Signature = {
  appId: string;
  timestamp: string;
  nonceStr: string;
  content: string;
}
type Err = {
  code: string;
  message: string;
}
