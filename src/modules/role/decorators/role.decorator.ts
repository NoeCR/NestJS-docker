import { SetMetadata } from "@nestjs/common";

/**
 * @description Sets a key / value pair with received roles
 * @param {Array<String>} roles List of roles 
 * @example @Roles('','')
 */
export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
