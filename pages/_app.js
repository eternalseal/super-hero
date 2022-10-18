import '../index.less';
import Layout from '../layout';
import '../styles/button.less'
import '../styles/landing.less'
import '../styles/filter.less'
import '../styles/header.less'
import '../styles/search.less'
import '../styles/heroCard.less'
import '../styles/heroDetails.less'
import '../utils/antDesignStyles.less'

function MyApp({ Component, pageProps }) {

  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
