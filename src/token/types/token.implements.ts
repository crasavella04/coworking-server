import { IPayloadToken } from './IPayloadToken';

export interface TokenImplements {
  createTokens: (dto: IPayloadToken) => { access: string; refresh: string };
  decodeAccessToken: (token: string) => IPayloadToken;
  decodeRefreshToken: (token: string) => IPayloadToken;
}
