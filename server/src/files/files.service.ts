import { existsSync } from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';


@Injectable()
export class FilesService {
    getStaticAvatarImage( imageName: string ) {

        const path = join( __dirname, '../../static/avatars', imageName );

        if( !existsSync(path) )
            throw new Error(`No avatar found with image ${ imageName }`);
        
        return path;
    }
}
