export type DOMMessage = {
  type: 'GET_DOM'
}

export type DOMMessageResponse = {
  title: string;
  headlines: string[];
  secheadlines: string[];

}