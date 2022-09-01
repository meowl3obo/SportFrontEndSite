import { IDict } from "@/type/Global";

export const Docs =  new class  {
    docs: IDict<string> = {
        Help: 'HelpAndFAQ',
        Feeback: "Feeback",
        Become_an_Expert: 'BecomeAnExpert',
        Become_a_Subscriber: 'BecomeASubscriber',
        Subscribe_Solution: 'SubscribeSolution',
        Documents_For_API: 'DocumentsForAPI',
        Samples: 'Samples',
        Contact_Support: 'ContactSupport',
        About: 'AboutUs',
        Use_of_the_Site: 'UseOfTheSite',
        Posting_Content_on_the_Site: 'PostingContentOnTheSite',
        Registering_for_an_account: 'RegisteringForAnAccount',
        Programs: 'Programs',
        Content_on_the_Site: 'ContentOnTheSite',
        General_terms: 'GeneralTerms',
        Policy: 'PolicyAndAgreements',
        Promotions: 'Promotions',
        Best_Deals: "BestDeals",
        Best_Experts: "BestExperts",
        OrdersAndCancelOrder: "OrdersAndCancelOrder",
        Notification: "Notification",
    }
    DocsRouter() {
        const doctArray = Object.keys(this.docs);
        return doctArray.join('|');
    }
    DocsValue(docsKey: string) {
        return this.docs[docsKey];
    }
}
