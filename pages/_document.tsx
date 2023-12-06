import React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => App,
                enhanceComponent: Component => Component,
            });
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: React.Children.toArray([initialProps.styles]),
        };
    }

    render() {
        return (
            <Html lang='es'>
                <Head>
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                    />
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
                    />
                    <link
                        rel='shortcut'
                        href='/favicon.ico'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
