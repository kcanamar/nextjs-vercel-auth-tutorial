import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('authed)) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
      </Head>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </>
  )
}