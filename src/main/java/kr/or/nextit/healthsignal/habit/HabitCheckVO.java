package kr.or.nextit.healthsignal.habit;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class HabitCheckVO {
    private int habcNo;
    private int habNo;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate habcDate;
    private String habcCheck;

}
