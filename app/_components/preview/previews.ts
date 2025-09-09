import FacebookPreview from "./facebook-preview";
import GooglePreview from "./google-preview";
import LinkedinPreview from "./linkedin-preview";
import PinterestPreview from "./pinterest-preview";
import SlackPreview from "./slack-preview";
import TwitterPreview from "./twitter-preview";

type SeoPreview = {
  name: string;
  component: React.ComponentType;
};
export const previews: SeoPreview[] = [
  { name: "Google", component: GooglePreview },
  { name: "X (Formerly Twitter)", component: TwitterPreview },
  { name: "Facebook", component: FacebookPreview },
  { name: "Slack", component: SlackPreview },
  { name: "LinkedIn", component: LinkedinPreview },
  { name: "Pinterest", component: PinterestPreview },
];
