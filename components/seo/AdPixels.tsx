import Script from "next/script";

/**
 * Meta and Google Ads tags, for /go/* ad landing pages only. Each loads only
 * when its ID is set, so nothing tracks until the ads are running.
 */
export function AdPixels() {
  const meta = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const google = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <>
      {meta && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`}
        </Script>
      )}
      {google && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${google}`} strategy="afterInteractive" />
          <Script id="google-ads" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${google}');`}
          </Script>
        </>
      )}
    </>
  );
}
