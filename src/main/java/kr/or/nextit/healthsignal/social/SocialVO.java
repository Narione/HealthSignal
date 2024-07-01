package kr.or.nextit.healthsignal.social;

import lombok.Data;

import java.util.Date;

@Data
public class SocialVO {
    int rankNo;
    int userNo;
    String userCity;
    int rankScore;
    int totalScore;
    String userNickname;
    String userPhoto;
    String userGender;
    Date rankCreDate;
}
