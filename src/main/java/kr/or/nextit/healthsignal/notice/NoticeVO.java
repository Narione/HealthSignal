package kr.or.nextit.healthsignal.notice;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NoticeVO {
    private int ntcNo;
    private int userNo;
    private String ntcTitle;
    private String ntcContent;
    private int ntcHits;
    private String ntcDel;
    private LocalDate ntcCreDate;
    private LocalDate ntcModDate;
}
