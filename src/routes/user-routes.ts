import express from 'express';
import { UserService } from '../core/services/user.service';

const router = express.Router();

router.get( '/:id', async ( req, res ): Promise<void> => {
    const id = parseInt( req.params.id, 10 );
    const user = await UserService.getUserById( id );

    if ( !user ) {
        res.status( 404 ).json( { error: 'User not found' } );
        return
    }

    console.log(user)

    res.json( user );
} );

router.post( '/', async ( req, res ) => {
    const { name, email, password, role, telegramUserId } = req.body;

    try {
        const user = await UserService.createUser( { name, email, password, role, telegramUserId } );
        res.status( 201 ).json( user );
    } catch ( error ) {
        res.status( 400 ).json( { error: 'Unable to create user' } );
    }
} );

export default router;