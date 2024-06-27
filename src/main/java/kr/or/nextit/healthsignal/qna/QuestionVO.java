package kr.or.nextit.healthsignal.qna;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionVO {
    private int queNo;
    private String userNo;
    private String queTitle;
    private String queContent;
    private String queDel;
    public String queAnswer;
    public String quePublic;
    public LocalDateTime queCreDate;
}
