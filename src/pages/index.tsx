import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    window.location.replace('/docs');
    return <Layout title={siteConfig.title}></Layout>;
}
