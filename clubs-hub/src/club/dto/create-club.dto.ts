import { IsDate, IsString } from "class-validator";

export class CreateClubDto {

    @IsString()
    name : string ;

    @IsString()
    field : string ;

    @IsDate()
    date: Date;


}
