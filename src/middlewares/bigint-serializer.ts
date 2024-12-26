import express from 'express';

export const handleBigIntMiddleware = ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
    res.json = ( data ) => {
        const replacer = ( _key: string, value: any ) =>
            typeof value === 'bigint' ? value.toString() : value;
        res.setHeader( 'Content-Type', 'application/json' );
        res.send( JSON.stringify( data, replacer ) );
        return res;
    };
    next();
};