import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RoleDTO {
    @IsOptional()
    @IsString()
    id?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    name: string;
}

export class ResponseRolesDTO {
    items: ResponseRoleGetDTO[];
    records: number;
}

export class ResponseRoleGetDTO extends RoleDTO {}

export class RequestRoleAddDTO extends RoleDTO {}

export class ResponseRolesAddDTO {
    id: string;
}

export class RequestRoleEditDTO extends RoleDTO {}
