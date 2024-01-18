import { Transform } from "class-transformer";
import { IsDate, IsString } from "class-validator";
import moment from 'moment';

export class CreateEventDto {

    @IsString()
    name : string ;

    @IsString()
    descriptioin : string ;

    @IsString()
    place: string;

    @IsDate()
   // @Transform(({ value }) => moment(value, 'DD/MM/YYYY').toDate())
    date: Date;

    
}


