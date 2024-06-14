import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

const BrowserOnlyRedirect = () => {
    // window.location.replace('/docs');
    return null;
};

const Home = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title={siteConfig.title}>
            <BrowserOnly>{() => <BrowserOnlyRedirect />}</BrowserOnly>
        </Layout>
    );
};

export default Home;
