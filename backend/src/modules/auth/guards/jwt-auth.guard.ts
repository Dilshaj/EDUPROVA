import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        console.log('JWT Auth Guard - Headers:', {
            auth: request.headers.authorization ? 'Present' : 'Missing',
            token: request.headers.authorization?.substring(0, 15) + '...'
        });
        if (err || !user) {
            console.log('JWT Auth Guard Failure:', { err, info });
            throw err || new UnauthorizedException('You must be logged in to access this resource');
        }
        return user;
    }
}
