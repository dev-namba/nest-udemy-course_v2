import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { UserRoleType } from "../enums/user_role_type.enum";

export class AuthClaims {
  @IsOptional()
  @IsEnum(UserRoleType)
  userRoleType?: UserRoleType;

  @IsOptional()
  @IsBoolean()
  isPreviouslyApproved?: boolean;
}