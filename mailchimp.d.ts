declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpConfig {
    apiKey: string;
    server: string;
  }

  interface Mailchimp {
    setConfig(config: MailchimpConfig): void;
    lists: {
      addListMember: (listId: string, data: any) => Promise<any>;
    };
  }

  const mailchimp: Mailchimp;
  export default mailchimp;
}