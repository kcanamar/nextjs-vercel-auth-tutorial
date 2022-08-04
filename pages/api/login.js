

export default async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();

    // exchange the DID from magic for some user data
    // TODO

    // Author a couple of cookies to persist a user session
    // TODO

    res.end();
};
