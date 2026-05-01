import { OG_IMAGE, SITE_DESC, SITE_NAME, SITE_URL, ASSETS } from "@/constants";
import { MetadataTagProps } from "@/types";

export const Metadata = ({ description, title, imageURL }: MetadataTagProps) => {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta property="og:image" content={imageURL || OG_IMAGE} />
      <meta property="og:description" content={description || SITE_DESC} />
      <meta property="og:title" content={title || SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || SITE_NAME} />
      <meta name="twitter:description" content={description || SITE_DESC} />
      <meta name="twitter:image" content={imageURL || OG_IMAGE} />
      <link rel="icon" href={`${SITE_URL}${ASSETS.favicon}`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${SITE_URL}${ASSETS.apple}`} />
    </>
  );
}
