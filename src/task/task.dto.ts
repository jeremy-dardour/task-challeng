import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

class CreateTaskDto {
  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsDateString()
  public shouldBeDoneOn: Date;

  @IsDateString()
  @IsOptional()
  public shouldBeRemindedOn: Date;

  @IsBoolean()
  @IsOptional()
  public completed: boolean;
}

export default CreateTaskDto;
