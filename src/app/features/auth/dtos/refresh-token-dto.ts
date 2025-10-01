export interface IBackendRefreshTokenResponse {
  refresh_token: {
    token: string;
    refresh_token: string;
  };
}

export interface IRefreshTokenResponse {
  token: string;
  refresh_token: string;
}
