export interface FaqData {
  title: string,
  children: Array<Faq>
}

export interface Faq {
  title: string,
  content: string
}
