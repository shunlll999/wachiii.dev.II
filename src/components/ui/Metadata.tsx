import { Fragment } from "react";

type Props = {
  seoTitle: string;
  seoDescription: string;
  page?: string;
}

export default function Metadata({ seoTitle, seoDescription, page }: Props) {
  return (
    <Fragment>
      <title>{`${seoTitle} ${page ? `- ${page}` : ''}`}</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content="wAiii the persona; website" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://wachiii-dev0.web.app" />
      <meta property="og:image" content="https://wachiii-dev0.web.app/assets/images/avatars/avatar-og.png" />
    </Fragment>
  );
}
