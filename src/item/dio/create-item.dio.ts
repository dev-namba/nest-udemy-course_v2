import { Type } from 'class-transformer'
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator'
export class CreateItemDto {
  // @IsNotEmpty()
  // @IsString()
  // id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  price: number

  @IsNotEmpty()
  @IsString()
  description: string
}