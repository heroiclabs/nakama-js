module.exports = {
    launch: {
        headless: true,
        args: [
            '--disable-features=LocalNetworkAccessChecks,BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults',
        ],
    },
};