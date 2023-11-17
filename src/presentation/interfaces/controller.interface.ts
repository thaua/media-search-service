export interface Controller {
  handle(...args: any): Promise<void>;
}
