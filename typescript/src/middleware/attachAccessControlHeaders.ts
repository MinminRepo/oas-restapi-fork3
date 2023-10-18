module.exports.attachAccessControlHeaders = async (req: any, res: any, next: any) => {


    const allowedOrigins = [
        "http://localhost",
        "http://127.0.0.1"
    ];

    if (allowedOrigins.includes (req.headers.origin))
        res.header ("Access-Control-Allow-Origin", req.headers.origin);
    else
        res.header ("Access-Control-Allow-Origin", allowedOrigins[0]);

    res.header ("Access-Control-Allow-Credentials", true);
    res.header ("Content-Type", "application/json; charset=utf-8");
    res.header ("X-Content-Type-Options", "nosniff");
    next ();

}