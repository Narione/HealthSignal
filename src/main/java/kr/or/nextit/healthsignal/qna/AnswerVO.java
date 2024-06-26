package kr.or.nextit.healthsignal.qna;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnswerVO {
    private int ansNo;
    private int queNo;
    private String ansTitle;
    private String ansContent;
    private String ansDel;
    private LocalDateTime ansCreDate;
    private LocalDateTime ansModDate;

}
