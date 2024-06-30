package kr.or.nextit.healthsignal.qna;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionVO {
    private int queNo;
    private String userNo;
    private String userNickname;
    private String userId;
    private String queTitle;
    private String queContent;
    private String queDel;
    private String queAnswer;
    private String quePublic;
    private LocalDateTime queCreDate;
    private int currentPage;
    private int pageSize;
    private String searchWord;
    private String searchType;
}
