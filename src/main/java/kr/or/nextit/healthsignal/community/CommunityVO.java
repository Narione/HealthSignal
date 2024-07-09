package kr.or.nextit.healthsignal.community;

import lombok.Data;

import java.util.Date;

@Data
public class CommunityVO {
    private int userNo;
    private String nickName;
    private Date cmntCreDate;
    private String cmntBft;
    private String cmntLCH;
    private String cmntDIR;
    private int cmntStep;
}
