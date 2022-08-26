import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="title"
            content="AlbVitaFitness - Suplement store and fitness accesories in Albania"
          />
          <meta
            name="description"
            content="AlbVitaFitness - Suplement store and fitness accesories in Albania"
          />
          <link rel="icon" href="/fav.png" />
          <link
            href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link href="/assets/css/elegant-icon.css" rel="stylesheet" />
          <link href="/assets/css/icomoon-icon.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <div id="subpages-sidebar" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
