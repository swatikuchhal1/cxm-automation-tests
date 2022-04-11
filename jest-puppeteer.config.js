module.exports = {
    launch: {
        headless: false,
        args: ['--no-sandbox',
        '--disable-setuid-sandbox',
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        '--disable-dev-shm-usage'],
        slowMo: 0
    },
    browserContext: "default"
};
