module.exports = {
    siteMetadata: {
        siteUrl: `https://www.cjml.no`,
    },
    pathPrefix: `/horm`,
    plugins: [
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /(actors|health|communication|customer_experience|cybersecurity)/
                }
            }
        }

    ]
}